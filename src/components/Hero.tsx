import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, User, Phone, Mail, Car } from 'lucide-react';
import { calculateFare } from '../utils/fareCalculator';
import { loadGoogleMapsAPI } from '../utils/googleMaps';
import { sendBookingEnquiryNotifications, sendBookingConfirmationNotifications, BookingEnquiry, generateBookingId, formatWhatsAppConfirmationMessage } from '../utils/notifications';

const Hero = () => {
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '1'
  });

  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [showEstimation, setShowEstimation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successBookingData, setSuccessBookingData] = useState<any>(null);
  const [tripDetails, setTripDetails] = useState<{
    distance: string;
    duration: string;
    fare: number;
    selectedCar: string;
    driverAllowance: number;
    vehicleRate: number;
  } | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const vehicles = [
    { name: 'SEDAN', rate: 14, image: '🚗' },
    { name: 'ETIOS', rate: 14, image: '🚗' },
    { name: 'SUV', rate: 19, image: '🚙' },
    { name: 'INNOVA', rate: 20, image: '🚐' }
  ];

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMapsAPI();
        setIsGoogleMapsLoaded(true);
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
      }
    };

    initializeGoogleMaps();
  }, []);

  useEffect(() => {
    if (isGoogleMapsLoaded && fromInputRef.current && toInputRef.current) {
      fromAutocompleteRef.current = new google.maps.places.Autocomplete(fromInputRef.current, {
        componentRestrictions: { country: 'IN' },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(10.8, 76.8),
          new google.maps.LatLng(11.2, 77.2)
        ),
        strictBounds: false,
        types: ['establishment', 'geocode']
      });

      toAutocompleteRef.current = new google.maps.places.Autocomplete(toInputRef.current, {
        componentRestrictions: { country: 'IN' },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(8.0, 76.0),
          new google.maps.LatLng(13.5, 80.3)
        ),
        strictBounds: false,
        types: ['establishment', 'geocode']
      });

      fromAutocompleteRef.current.addListener('place_changed', () => {
        const place = fromAutocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          setBookingForm(prev => ({
            ...prev,
            from: place.formatted_address || place.name || ''
          }));
        }
      });

      toAutocompleteRef.current.addListener('place_changed', () => {
        const place = toAutocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          setBookingForm(prev => ({
            ...prev,
            to: place.formatted_address || place.name || ''
          }));
        }
      });
    }
  }, [isGoogleMapsLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle.name);
    
    // Generate booking ID for enquiry
    const bookingId = generateBookingId();
    
    // Calculate distance and fare
    if (isGoogleMapsLoaded && fromAutocompleteRef.current && toAutocompleteRef.current) {
      const fromPlace = fromAutocompleteRef.current.getPlace();
      const toPlace = toAutocompleteRef.current.getPlace();
      
      if (fromPlace.geometry?.location && toPlace.geometry?.location) {
        try {
          const service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix({
            origins: [fromPlace.geometry.location],
            destinations: [toPlace.geometry.location],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, (response, status) => {
            if (status === google.maps.DistanceMatrixStatus.OK && response) {
              const distance = response.rows[0].elements[0].distance;
              const duration = response.rows[0].elements[0].duration;
              if (distance) {
                const distanceKm = distance.value / 1000;
                const fare = Math.round((distanceKm * vehicle.rate) + 400);
                
                setTripDetails({
                  distance: `${Math.round(distanceKm)} KM`,
                  duration: duration ? `${Math.round(duration.value / 3600)} hours ${Math.round((duration.value % 3600) / 60)} mins` : 'Calculating...',
                  fare: fare,
                  selectedCar: vehicle.name,
                  driverAllowance: 400,
                  vehicleRate: vehicle.rate
                });
                
                // Auto-send enquiry notifications
                const enquiryData: BookingEnquiry = {
                  tripType: 'oneway',
                  from: bookingForm.from,
                  to: bookingForm.to,
                  date: bookingForm.date,
                  time: bookingForm.time,
                  passengers: bookingForm.passengers,
                  fareEstimate: fare,
                  bookingId: bookingId,
                  vehicleType: vehicle.name,
                  customerName: bookingForm.customerName,
                  customerPhone: bookingForm.customerPhone,
                  customerEmail: bookingForm.customerEmail,
                  tripDistance: `${Math.round(distanceKm)} KM`,
                  tripDuration: duration ? `${Math.round(duration.value / 3600)} hours ${Math.round((duration.value % 3600) / 60)} mins` : 'Calculating...',
                  vehicleRate: vehicle.rate,
                  driverAllowance: 400
                };

                console.log('📧 Auto-sending enquiry notifications...');
                sendBookingEnquiryNotifications(enquiryData).then(() => {
                  console.log('✅ Enquiry notifications sent automatically');
                }).catch(console.error);
                
                setShowEstimation(true);
              }
            }
          });
        } catch (error) {
          console.error('Error calculating fare:', error);
        }
      }
    }
  };

  const handleGetEstimation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingForm.customerName || !bookingForm.customerPhone || !bookingForm.from || !bookingForm.to || !bookingForm.date || !bookingForm.time) {
      console.log('Please fill in all required fields and select a vehicle.');
      return;
    }

    // Find selected vehicle details
    const selectedVehicleData = vehicles.find(v => v.name === selectedVehicle);
    if (selectedVehicleData) {
      handleVehicleSelect(selectedVehicleData);
    }
  };

  const handleConfirmBooking = () => {
    const confirmationBookingId = generateBookingId();
    
    const bookingData: BookingEnquiry = {
      tripType: 'oneway',
      from: bookingForm.from,
      to: bookingForm.to,
      date: bookingForm.date,
      time: bookingForm.time,
      passengers: bookingForm.passengers,
      fareEstimate: tripDetails?.fare,
      bookingId: confirmationBookingId,
      vehicleType: tripDetails?.selectedCar || selectedVehicle,
      customerName: bookingForm.customerName,
      customerPhone: bookingForm.customerPhone,
      customerEmail: bookingForm.customerEmail,
      tripDistance: tripDetails?.distance || 'To be calculated',
      tripDuration: tripDetails?.duration || 'To be calculated',
      vehicleRate: tripDetails?.vehicleRate || 14,
      driverAllowance: tripDetails?.driverAllowance || 400
    };

    console.log('📧 Auto-sending confirmation notifications...');
    sendBookingConfirmationNotifications(bookingData).then(() => {
      console.log('✅ Confirmation notifications sent automatically');
    }).catch(console.error);

    // Auto-send WhatsApp confirmation to client
    console.log('📱 Auto-sending WhatsApp confirmation to client...');
    const message = formatWhatsAppConfirmationMessage(bookingData);
    const clientWhatsappUrl = `https://wa.me/917810095200?text=${message}`;
    
    // Open WhatsApp to client automatically
    setTimeout(() => {
      window.open(clientWhatsappUrl, '_blank');
      console.log('✅ WhatsApp confirmation sent to 7810095200 automatically');
    }, 1000);
    setSuccessBookingData(bookingData);
    setShowSuccessMessage(true);
    setShowEstimation(false);
  };

  const handleGoHome = () => {
    setShowSuccessMessage(false);
    setSuccessBookingData(null);
    setShowEstimation(false);
    setSelectedVehicle('');
    setTripDetails(null);
    setBookingForm({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      from: '',
      to: '',
      date: '',
      time: '',
      passengers: '1'
    });
  };

  const handleWhatsAppBooking = () => {
    if (successBookingData) {
      const message = formatWhatsAppConfirmationMessage(successBookingData);
      const whatsappUrl = `https://wa.me/917810095200?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')"
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              1waytaxi - Premium Service in 
              <span className="text-orange-400"> All Over TamilNadu</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Safe, reliable, and comfortable rides across Coimbatore and Tamil Nadu. Local and outstation trips with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-xl">
                Book Instantly
              </button>
              <a href="https://wa.me/917810095200" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-xl text-center">
                WhatsApp Us
              </a>
              <a href="tel:+917810095200" className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-blue-900 transition-all text-center backdrop-blur-sm">
                Call +91 7810095200
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-8 border border-white/20">
            {!showEstimation && !showSuccessMessage && (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white">Book Your One Way Taxi</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Pickup Address */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Pickup Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <input
                        ref={fromInputRef}
                        type="text"
                        name="from"
                        placeholder="Pickup Location"
                        value={bookingForm.from}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Drop Address */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Drop Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400" />
                      <input
                        ref={toInputRef}
                        type="text"
                        name="to"
                        placeholder="Drop Location"
                        value={bookingForm.to}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Name and Mobile */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-3">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="text"
                          name="customerName"
                          placeholder="Full Name"
                          value={bookingForm.customerName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-3">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="tel"
                          name="customerPhone"
                          placeholder="Mobile Number"
                          value={bookingForm.customerPhone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-semibold mb-3">Email(optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <input
                        type="email"
                        name="customerEmail"
                        placeholder="Email"
                        value={bookingForm.customerEmail}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-3">Pickup Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="date"
                          name="date"
                          value={bookingForm.date}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-3">Pickup Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="time"
                          name="time"
                          value={bookingForm.time}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {vehicles.map((vehicle, index) => (
                      <div 
                        key={index}
                        className={`bg-white/10 backdrop-blur-sm border-2 rounded-lg p-4 text-center cursor-pointer transition-all hover:bg-white/20 ${
                          selectedVehicle === vehicle.name ? 'border-orange-400 bg-orange-400/20' : 'border-white/30'
                        }`}
                        onClick={() => setSelectedVehicle(vehicle.name)}
                      >
                        <div className="text-3xl mb-2">{vehicle.image}</div>
                        <div className="text-white font-bold text-sm mb-1">{vehicle.rate}₹/KM</div>
                        <div className="text-white text-sm font-semibold">{vehicle.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGetEstimation}
                  disabled={!selectedVehicle}
                  className={`w-full py-4 rounded-lg text-lg font-bold transition-all ${
                    selectedVehicle 
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg' 
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Get Estimation
                </button>
              </>
            )}

            {/* Trip Estimation */}
            {showEstimation && tripDetails && !showSuccessMessage && (
              <div className="text-center text-white">
                <h3 className="text-xl font-bold mb-6">
                  Trip estimation for {bookingForm.from.split(',')[0]} to {bookingForm.to.split(',')[0]}
                </h3>
                
                <div className="mb-8">
                  <h2 className="text-5xl font-bold mb-6">Fare ₹{tripDetails.fare.toLocaleString()}</h2>
                  
                  <div className="space-y-3 text-lg">
                    <p><span className="font-semibold">Total Distance:</span> {tripDetails.distance}</p>
                    <p><span className="font-semibold">Total Duration:</span> {tripDetails.duration}</p>
                    <p><span className="font-semibold">Selected Car:</span> {tripDetails.selectedCar}</p>
                    <p><span className="font-semibold">Driver Batta:</span> ₹{tripDetails.driverAllowance}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-4 mb-6">
                  <p className="text-yellow-200 text-sm italic">
                    Note: Above estimation is exclusive of Toll Gate and State Permit Etc
                  </p>
                </div>
                
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-xl text-lg font-bold hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            )}

            {/* Success Message */}
            {showSuccessMessage && successBookingData && (
              <div className="text-center text-white">
                <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-200 mb-6">Thanks for booking 1waytaxi</p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6 text-left">
                  <h4 className="font-semibold text-lg mb-4">Booking Details:</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Booking ID:</span> {successBookingData.bookingId}</p>
                    <p><span className="font-medium">From:</span> {successBookingData.from}</p>
                    <p><span className="font-medium">To:</span> {successBookingData.to}</p>
                    <p><span className="font-medium">Date & Time:</span> {successBookingData.date} {successBookingData.time}</p>
                    <p><span className="font-medium">Vehicle:</span> {successBookingData.vehicleType}</p>
                    <p><span className="font-medium">Fare:</span> ₹{successBookingData.fareEstimate}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={handleGoHome}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
                  >
                    Home Page
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-300 mt-6">
                  <p>We have sent booking details to your email.</p>
                  <p>Our team will contact you shortly at {successBookingData.customerPhone}</p>
                  <p className="text-green-400 font-semibold mt-2">✅ WhatsApp confirmation sent automatically!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;