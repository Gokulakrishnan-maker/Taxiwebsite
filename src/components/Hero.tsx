import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { calculateFare } from '../utils/fareCalculator';
import { loadGoogleMapsAPI } from '../utils/googleMaps';

const Hero = () => {
  const [bookingForm, setBookingForm] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '1'
  });

  const [fareEstimate, setFareEstimate] = useState<number | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

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

  const calculateFareEstimate = async (destinationPlace: google.maps.places.PlaceResult) => {
    if (!fromAutocompleteRef.current || !destinationPlace.geometry?.location) return;

    const fromPlace = fromAutocompleteRef.current.getPlace();
    if (!fromPlace.geometry?.location) return;

    try {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [fromPlace.geometry.location],
        destinations: [destinationPlace.geometry.location],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
          const distance = response.rows[0].elements[0].distance;
          if (distance) {
            const distanceKm = distance.value / 1000;
            const isNightTime = new Date().getHours() >= 23 || new Date().getHours() <= 5;
            const fare = calculateFare(distanceKm, 'economy', isNightTime, true);
            setFareEstimate(fare.totalFare);
          }
        }
      });
    } catch (error) {
      console.error('Error calculating fare:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fareText = fareEstimate ? `Estimated fare: ₹${fareEstimate}` : 'Fare will be calculated based on actual distance';
    alert(`Booking request submitted! ${fareText}. We will contact you shortly at +91 74186 40616.`);
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
              Kovai Drop Taxi - Premium Service in 
              <span className="text-orange-400"> Coimbatore</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Safe, reliable, and comfortable rides across Coimbatore and Tamil Nadu. Local and outstation trips with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
                Book Instantly
              </button>
              <a href="tel:+917418640616" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all text-center">
                Call +91 74186 40616
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Ride in Coimbatore</h3>
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                  <input
                    ref={fromInputRef}
                    type="text"
                    name="from"
                    placeholder="Pick-up location (e.g., RS Puram)"
                    value={bookingForm.from}
                    onChange={handleInputChange}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                  <input
                    ref={toInputRef}
                    type="text"
                    name="to"
                    placeholder="Drop-off location (e.g., Airport)"
                    value={bookingForm.to}
                    onChange={handleInputChange}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={bookingForm.time}
                    onChange={handleInputChange}
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <select
                name="passengers"
                value={bookingForm.passengers}
                onChange={handleInputChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5+">5+ Passengers</option>
              </select>

              {fareEstimate && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">
                    Estimated Fare: ₹{fareEstimate}
                  </p>
                  <p className="text-green-600 text-sm">
                    *Final fare may vary based on actual route and traffic conditions
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;