import React from 'react';
import { MapPin, Clock, ArrowRight, Phone, MessageCircle } from 'lucide-react';

const MostBookedRoutes = () => {
  const routes = [
    {
      from: 'Chennai',
      to: 'Madurai',
      fare: '₹6,812',
      distance: '458 km',
      duration: '7h 30m'
    },
    {
      from: 'Chennai',
      to: 'Coimbatore',
      fare: '₹7,400',
      distance: '500 km',
      duration: '8h'
    },
    {
      from: 'Madurai',
      to: 'Chennai',
      fare: '₹6,812',
      distance: '458 km',
      duration: '7h 30m'
    },
    {
      from: 'Chennai',
      to: 'Salem',
      fare: '₹5,160',
      distance: '340 km',
      duration: '5h 30m'
    },
    {
      from: 'Chennai',
      to: 'Tiruchirappalli',
      fare: '₹4,880',
      distance: '320 km',
      duration: '5h'
    },
    {
      from: 'Chennai',
      to: 'Thanjavur',
      fare: '₹5,300',
      distance: '350 km',
      duration: '6h'
    },
    {
      from: 'Madurai',
      to: 'Coimbatore',
      fare: '₹3,480',
      distance: '220 km',
      duration: '3h 30m'
    },
    {
      from: 'Salem',
      to: 'Chennai',
      fare: '₹5,160',
      distance: '340 km',
      duration: '5h 30m'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Booked Routes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Popular taxi routes across Tamil Nadu with transparent pricing and professional service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{route.from}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-gray-900">{route.to}</span>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600 mb-2">{route.fare}</div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{route.duration}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 group shadow-md">
                <span>View Details</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">Book Your Route Today!</h3>
            <p className="text-xl mb-8 opacity-90">
              Professional drivers, comfortable vehicles, and transparent pricing for all routes across Tamil Nadu
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:+917810095200" 
                className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105"
              >
                <Phone className="inline h-5 w-5 mr-2" />
                Call +91 7810095200
              </a>
              <a 
                href="https://wa.me/917810095200" 
                className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg transform hover:scale-105 border-2 border-white"
              >
                <MessageCircle className="inline h-5 w-5 mr-2" />
                WhatsApp Us
              </a>
              <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-colors backdrop-blur-sm">
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostBookedRoutes;