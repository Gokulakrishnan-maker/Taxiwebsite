import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { calculateFare } from '../utils/fareCalculator';
import { loadGoogleMapsAPI } from '../utils/googleMaps';
import { sendBookingEnquiryNotifications, sendBookingConfirmationNotifications, showBookingConfirmation, BookingEnquiry, generateBookingId } from '../utils/notifications';

const Hero = () => {
  const [bookingForm, setBookingForm] = useState({
    tripType: 'oneway',
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
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
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
      // Initialize autocomplete for pickup location
      fromAutocompleteRef.current = new google.maps.places.Autocomplete(fromInputRef.current, {
        componentRestrictions: { country: 'IN' },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(10.8, 76.8), // Southwest corner of Coimbatore
          new google.maps.LatLng(11.2, 77.2)  // Northeast corner of Coimbatore
        ),
        strictBounds: false,
        types: ['establishment', 'geocode']
      });

      // Initialize autocomplete for dropoff location
      toAutocompleteRef.current = new google.maps.places.Autocomplete(toInputRef.current, {
        componentRestrictions: { country: 'IN' },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(8.0, 76.0), // Southwest corner of Tamil Nadu
          new google.maps.LatLng(13.5, 80.3)  // Northeast corner of Tamil Nadu
        ),
        strictBounds: false,
        types: ['establishment', 'geocode']
      });

      // Add place changed listeners
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
          
          // Calculate fare when destination is selected
          calculateFareEstimate(place);
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

  const handleGetEstimation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!bookingForm.customerName || !bookingForm.customerPhone || !bookingForm.from || !bookingForm.to || !bookingForm.date || !bookingForm.time) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Show vehicle selection
    setShowVehicleSelection(true);
  };

  const handleVehicleSelect = async (vehicle: any) => {
    setSelectedVehicle(vehicle.name);
    
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
                const fare = Math.round((distanceKm * vehicle.rate) + 400); // Vehicle rate + driver allowance
                
                setTripDetails({
                  distance: `${Math.round(distanceKm)} KM`,
                  duration: duration ? `${Math.round(duration.value / 3600)} hours ${Math.round((duration.value % 3600) / 60)} mins` : 'Calculating...',
                  fare: fare,
                  selectedCar: vehicle.name,
                  driverAllowance: 400,
                  vehicleRate: vehicle.rate
                });
                
                setShowVehicleSelection(false);
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

  const handleConfirmBooking = () => {
    // Generate unique booking ID
    const bookingId = generateBookingId();
    
    // Create booking object
    const bookingData: BookingEnquiry = {
      tripType: bookingForm.tripType,
      from: bookingForm.from,
      to: bookingForm.to,
      date: bookingForm.date,
      time: bookingForm.time,
      passengers: bookingForm.passengers,
      fareEstimate: tripDetails?.fare,
      bookingId: bookingId,
      vehicleType: tripDetails?.selectedCar || selectedVehicle,
      customerName: bookingForm.customerName,
      customerPhone: bookingForm.customerPhone,
      customerEmail: bookingForm.customerEmail,
      tripDistance: tripDetails?.distance || 'To be calculated',
      tripDuration: tripDetails?.duration || 'To be calculated',
      vehicleRate: tripDetails?.vehicleRate || 14,
      driverAllowance: tripDetails?.driverAllowance || 400
    };

    // Send both enquiry and confirmation notifications
    console.log('📧 Sending booking notifications...');
    
    // Send enquiry notification
    sendBookingEnquiryNotifications(bookingData).then(() => {
      console.log('✅ Enquiry notifications sent');
    }).catch(console.error);
    
    // Send confirmation notification after 1 second
    setTimeout(() => {
      sendBookingConfirmationNotifications(bookingData).then(() => {
        console.log('✅ Confirmation notifications sent');
      }).catch(console.error);
    }, 1000);

    // Show success message to customer
    showBookingConfirmation(bookingData);
    
    // Reset form
    setBookingForm({
      tripType: 'oneway',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      from: '',
      to: '',
      date: '',
      time: '',
      passengers: '1'
    });
    setSelectedVehicle('');
    setShowEstimation(false);
    setShowVehicleSelection(false);
    setTripDetails(null);
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
                Call +91 78100 95200
              </a>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20">
            {!showVehicleSelection && !showEstimation && (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Book Your Ride
                  </h3>
                  <p className="text-gray-600">Quick & Easy Booking</p>
                </div>
                <form onSubmit={handleGetEstimation} className="space-y-6">
              {/* Modern Trip Type Selection */}
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Trip Type</label>
                <div className="relative bg-gray-100 p-1 rounded-xl flex">
                  <div 
                    className={`absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transition-all duration-300 ease-in-out ${
                      bookingForm.tripType === 'oneway' ? 'left-1 right-1/2' : 'left-1/2 right-1'
                    }`}
                  ></div>
                  <button
                    type="button"
                    onClick={() => setBookingForm(prev => ({ ...prev, tripType: 'oneway' }))}
                    className={`relative z-10 flex-1 py-3 px-6 text-center font-semibold rounded-lg transition-all duration-300 ${
                      bookingForm.tripType === 'oneway'
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        bookingForm.tripType === 'oneway' ? 'bg-white' : 'bg-blue-500'
                      }`}></div>
                      <span>One Way</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingForm(prev => ({ ...prev, tripType: 'roundtrip' }))}
                    className={`relative z-10 flex-1 py-3 px-6 text-center font-semibold rounded-lg transition-all duration-300 ${
                      bookingForm.tripType === 'roundtrip'
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        bookingForm.tripType === 'roundtrip' ? 'bg-white' : 'bg-blue-500'
                      }`}></div>
                      <span>Round Trip</span>
                    </div>
                  </button>
                </div>
                <div className="mt-3 text-xs text-gray-500 text-center">
                  {bookingForm.tripType === 'oneway' 
                    ? 'Perfect for airport transfers and one-way journeys' 
                    : 'Ideal for sightseeing and return trips with better rates'
                  }
                </div>
              </div>

              {/* Customer Information Section */}
              <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 shadow-sm">
                <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Customer Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Enter your full name"
                      value={bookingForm.customerName}
                      onChange={handleInputChange}
                      className="w-full py-4 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      placeholder="Enter mobile number"
                      value={bookingForm.customerPhone}
                      onChange={handleInputChange}
                      pattern="[0-9]{10}"
                      className="w-full py-4 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                      required
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      10-digit mobile number (e.g., 9876543210)
                    </div>
                  </div>
                  <div className="relative md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="customerEmail"
                      placeholder="Enter email address (optional)"
                      value={bookingForm.customerEmail}
                      onChange={handleInputChange}
                      className="w-full py-4 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Email for booking confirmations and updates
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pick-up Location</label>
                  <MapPin className="absolute left-4 top-11 h-5 w-5 text-blue-500 z-10" />
                  <input
                    ref={fromInputRef}
                    type="text"
                    name="from"
                    placeholder="Pick-up location (e.g., RS Puram)"
                    value={bookingForm.from}
                    onChange={handleInputChange}
                    className="pl-12 w-full py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Drop-off Location</label>
                  <MapPin className="absolute left-4 top-11 h-5 w-5 text-red-500 z-10" />
                  <input
                    ref={toInputRef}
                    type="text"
                    name="to"
                    placeholder="Drop-off location (e.g., Airport)"
                    value={bookingForm.to}
                    onChange={handleInputChange}
                    className="pl-12 w-full py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Date</label>
                  <Calendar className="absolute left-4 top-11 h-5 w-5 text-green-500" />
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    className="pl-12 w-full py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Time</label>
                  <Clock className="absolute left-4 top-11 h-5 w-5 text-purple-500" />
                  <input
                    type="time"
                    name="time"
                    value={bookingForm.time}
                    onChange={handleInputChange}
                    className="pl-12 w-full py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Passengers</label>
                <select
                  name="passengers"
                  value={bookingForm.passengers}
                  onChange={handleInputChange}
                  className="w-full py-4 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm bg-white"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5+">5+ Passengers</option>
                </select>
              </div>

              {!showEstimation ? (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-3 group shadow-lg transform hover:scale-105"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </button>
              ) : null}
                </form>
              </>
            )}

            {/* Vehicle Selection */}
            {showVehicleSelection && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Vehicle</h3>
                  <p className="text-gray-600">Choose the perfect car for your journey</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {vehicles.map((vehicle, index) => (
                    <div 
                      key={index}
                      onClick={() => handleVehicleSelect(vehicle)}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <div className="text-4xl mb-3">{vehicle.image}</div>
                      <h4 className="font-bold text-gray-900 mb-2">{vehicle.name}</h4>
                      <p className="text-blue-600 font-bold text-lg">₹{vehicle.rate}/KM</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trip Estimation */}
            {showEstimation && tripDetails && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Trip estimation for {bookingForm.from.split(',')[0]} to {bookingForm.to.split(',')[0]}
                  </h3>
                </div>
                
                <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl">
                  <h2 className="text-4xl font-bold mb-6">Fare ₹{tripDetails.fare.toLocaleString()}</h2>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="opacity-90">Total Distance: <span className="font-bold">{tripDetails.distance}</span></p>
                    </div>
                    <div>
                      <p className="opacity-90">Total Duration: <span className="font-bold">{tripDetails.duration}</span></p>
                    </div>
                    <div>
                      <p className="opacity-90">Selected Car: <span className="font-bold">{tripDetails.selectedCar}</span></p>
                    </div>
                    <div>
                      <p className="opacity-90">Driver Batta: <span className="font-bold">₹{tripDetails.driverAllowance}</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <p className="text-yellow-800 text-sm italic">
                    Note: Above estimation is exclusive of Toll Gate and State Permit Etc
                  </p>
                </div>
                
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;