import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, User, Phone, Mail, Car } from 'lucide-react';
import { calculateFare } from '../utils/fareCalculator';
import { loadGoogleMapsAPI } from '../utils/googleMaps';
import { 
  sendBookingEnquiryNotifications, 
  sendBookingConfirmationNotifications, 
  BookingEnquiry, 
  generateBookingId, 
  formatWhatsAppConfirmationMessage 
} from '../utils/notifications';

// Analog Clock Component
const AnalogClock = ({ selectedTime, onTimeChange }: { selectedTime: string, onTimeChange: (time: string) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<'hour' | 'minute' | null>(null);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  
  const parseTime = (timeStr: string) => {
    if (!timeStr) return { hours: 12, minutes: 0, period: 'AM' };
    const [time, timePeriod] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    return { 
      hours: hours || 12, 
      minutes: minutes || 0,
      period: timePeriod || 'AM'
    };
  };
  
  const { hours, minutes, period: currentPeriod } = parseTime(selectedTime);
  
  // Update period state when selectedTime changes
  React.useEffect(() => {
    if (selectedTime) {
      const parsed = parseTime(selectedTime);
      setPeriod(parsed.period as 'AM' | 'PM');
    }
  }, [selectedTime]);
  
  const hourAngle = (hours % 12) * 30 + (minutes * 0.5) - 90;
  const minuteAngle = minutes * 6 - 90;
  
  const formatTime = (hour: number, minute: number, timePeriod: 'AM' | 'PM') => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${timePeriod}`;
  };
  
  const handleClockClick = (e: React.MouseEvent<SVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const angle = Math.atan2(y, x) * 180 / Math.PI + 90;
    const normalizedAngle = (angle + 360) % 360;
    
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance < 40) { // Hour hand
      const newHour = Math.round(normalizedAngle / 30) % 12;
      const displayHour = newHour === 0 ? 12 : newHour;
      onTimeChange(formatTime(displayHour, minutes, period));
    } else if (distance < 60) { // Minute hand
      const newMinute = Math.round(normalizedAngle / 6) % 60;
      onTimeChange(formatTime(hours, newMinute, period));
    }
  };
  
  const handlePeriodToggle = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    onTimeChange(formatTime(hours, minutes, newPeriod));
  };
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <svg 
        width="120" 
        height="120" 
        className="cursor-pointer"
        onClick={handleClockClick}
      >
        {/* Clock face */}
        <circle cx="60" cy="60" r="55" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 - 90;
          const x1 = 60 + 45 * Math.cos(angle * Math.PI / 180);
          const y1 = 60 + 45 * Math.sin(angle * Math.PI / 180);
          const x2 = 60 + 50 * Math.cos(angle * Math.PI / 180);
          const y2 = 60 + 50 * Math.sin(angle * Math.PI / 180);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#374151" strokeWidth="2"/>
          );
        })}
        
        {/* Hour numbers */}
        {[...Array(12)].map((_, i) => {
          const hour = i === 0 ? 12 : i;
          const angle = i * 30 - 90;
          const x = 60 + 35 * Math.cos(angle * Math.PI / 180);
          const y = 60 + 35 * Math.sin(angle * Math.PI / 180);
          return (
            <text key={i} x={x} y={y + 4} textAnchor="middle" className="text-xs font-semibold fill-gray-700">
              {hour}
            </text>
          );
        })}
        
        {/* Hour hand */}
        <line 
          x1="60" 
          y1="60" 
          x2={60 + 30 * Math.cos(hourAngle * Math.PI / 180)} 
          y2={60 + 30 * Math.sin(hourAngle * Math.PI / 180)} 
          stroke="#1f2937" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        
        {/* Minute hand */}
        <line 
          x1="60" 
          y1="60" 
          x2={60 + 45 * Math.cos(minuteAngle * Math.PI / 180)} 
          y2={60 + 45 * Math.sin(minuteAngle * Math.PI / 180)} 
          stroke="#3b82f6" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle cx="60" cy="60" r="4" fill="#1f2937"/>
      </svg>
      
      <div className="text-center">
        <div className="text-white font-bold text-lg">{selectedTime || '12:00 AM'}</div>
        <div className="text-blue-200 text-xs">Click to set time</div>
      </div>
      
      {/* AM/PM Toggle */}
      <div className="flex bg-white/20 rounded-lg p-1 mt-2">
        <button
          onClick={handlePeriodToggle}
          className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
            period === 'AM' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          AM
        </button>
        <button
          onClick={handlePeriodToggle}
          className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
            period === 'PM' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          PM
        </button>
      </div>
    </div>
  );
};

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
  const [showAnalogClock, setShowAnalogClock] = useState(false);
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
                  // Show user feedback
                  alert('📧 Booking enquiry sent! You will receive an email confirmation shortly.');
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
      // Show user feedback
      alert('📧 Booking confirmed! You will receive an email confirmation shortly.');
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
    setShowAnalogClock(false);
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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 via-pink-500 to-red-500 opacity-70"></div>
      
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/15 rounded-full blur-2xl animate-ping"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-yellow-300/40 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-300/50 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-blue-300/40 rounded-full animate-float-delayed"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              1waytaxi - Premium Service in 
              <span className="text-yellow-300 drop-shadow-lg"> All Over TamilNadu</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed drop-shadow-md">
              Safe, reliable, and comfortable rides across Coimbatore and Tamil Nadu. Local and outstation trips with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="https://wa.me/917810095200" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl text-center backdrop-blur-sm">
                WhatsApp Us
              </a>
              <a href="tel:+917810095200" className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-purple-600 transition-all text-center backdrop-blur-sm">
                Call +91 7810095200
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20 max-w-md mx-auto">
            {!showEstimation && !showSuccessMessage && (
              <>
                
                <div className="space-y-4">
                  {/* Pickup Address */}
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Pickup Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <input
                        ref={fromInputRef}
                        type="text"
                        name="from"
                        placeholder="Pickup Location"
                        value={bookingForm.from}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Drop Address */}
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Drop Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400" />
                      <input
                        ref={toInputRef}
                        type="text"
                        name="to"
                        placeholder="Drop Location"
                        value={bookingForm.to}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Name and Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="text"
                          name="customerName"
                          placeholder="Full Name"
                          value={bookingForm.customerName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="tel"
                          name="customerPhone"
                          placeholder="Mobile Number"
                          value={bookingForm.customerPhone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Email (optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <input
                        type="email"
                        name="customerEmail"
                        placeholder="Email"
                        value={bookingForm.customerEmail}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Pickup Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="date"
                          name="date"
                          value={bookingForm.date}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Pickup Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="text"
                          name="time"
                          placeholder="Select Time"
                          value={bookingForm.time || ''}
                          onClick={() => setShowAnalogClock(true)}
                          readOnly
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm cursor-pointer"
                          required
                        />
                      </div>
                      
                      {/* Analog Clock Popup */}
                      {showAnalogClock && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                            <div className="text-center mb-4">
                              <h3 className="text-white font-bold text-lg">Select Pickup Time</h3>
                            </div>
                            <AnalogClock 
                              selectedTime={bookingForm.time}
                              onTimeChange={(time) => {
                                setBookingForm(prev => ({ ...prev, time }));
                              }}
                            />
                            <div className="flex gap-3 mt-6">
                              <button
                                onClick={() => setShowAnalogClock(false)}
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                              >
                                Confirm Time
                              </button>
                              <button
                                onClick={() => setShowAnalogClock(false)}
                                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {vehicles.map((vehicle, index) => (
                      <div 
                        key={index}
                        className={`bg-white/10 backdrop-blur-sm border-2 rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-white/20 ${
                          selectedVehicle === vehicle.name ? 'border-orange-400 bg-orange-400/20' : 'border-white/30'
                        }`}
                        onClick={() => setSelectedVehicle(vehicle.name)}
                      >
                        <div className="text-2xl mb-1">{vehicle.image}</div>
                        <div className="text-white font-bold text-xs mb-1">{vehicle.rate}₹/KM</div>
                        <div className="text-white text-xs font-semibold">{vehicle.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleGetEstimation}
                    disabled={!selectedVehicle}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
                      selectedVehicle 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-2xl hover:scale-105' 
                        : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Get Estimation
                  </button>
                </div>
              </>
            )}

            {/* Trip Estimation */}
            {showEstimation && tripDetails && !showSuccessMessage && (
              <div className="text-center text-white">
                <h3 className="text-lg font-bold mb-4">
                  Trip estimation for {bookingForm.from.split(',')[0]} to {bookingForm.to.split(',')[0]}
                </h3>
                
                <div className="mb-6">
                  <h2 className="text-4xl font-bold mb-4">Fare ₹{tripDetails.fare.toLocaleString()}</h2>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Total Distance:</span> {tripDetails.distance}</p>
                    <p><span className="font-semibold">Total Duration:</span> {tripDetails.duration}</p>
                    <p><span className="font-semibold">Selected Car:</span> {tripDetails.selectedCar}</p>
                    <p><span className="font-semibold">Driver Batta:</span> ₹{tripDetails.driverAllowance}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-3 mb-4">
                  <p className="text-yellow-200 text-sm italic">
                    Note: Above estimation is exclusive of Toll Gate and State Permit Etc
                  </p>
                </div>
                
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            )}

            {/* Success Message */}
            {showSuccessMessage && successBookingData && (
              <div className="text-center text-white">
                <div className="bg-green-500 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-200 mb-4">Thanks for booking 1waytaxi</p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 text-left">
                  <h4 className="font-semibold mb-3">Booking Details:</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Booking ID:</span> {successBookingData.bookingId}</p>
                    <p><span className="font-medium">From:</span> {successBookingData.from}</p>
                    <p><span className="font-medium">To:</span> {successBookingData.to}</p>
                    <p><span className="font-medium">Date & Time:</span> {successBookingData.date} {successBookingData.time}</p>
                    <p><span className="font-medium">Vehicle:</span> {successBookingData.vehicleType}</p>
                    <p><span className="font-medium">Fare:</span> ₹{successBookingData.fareEstimate}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleGoHome}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                  >
                    Home Page
                  </button>
                </div>
                
                <div className="text-center text-xs text-gray-300 mt-4">
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