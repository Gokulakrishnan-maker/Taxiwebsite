import React from 'react';
import { useState } from 'react';
import { MapPin, Clock, ArrowRight, Phone, MessageCircle, X, Car, Calculator } from 'lucide-react';

const MostBookedRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const routes = [
    {
      id: 1,
      from: 'Chennai',
      to: 'Madurai',
      fare: '₹6,812',
      distance: '458 km',
      duration: '7h 30m',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 458,
        estimatedFuel: 2000,
        tollCharges: 200
      }
    },
    {
      id: 2,
      from: 'Chennai',
      to: 'Coimbatore',
      fare: '₹7,400',
      distance: '500 km',
      duration: '8h',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 500,
        estimatedFuel: 2200,
        tollCharges: 300
      }
    },
    {
      id: 3,
      from: 'Madurai',
      to: 'Chennai',
      fare: '₹6,812',
      distance: '458 km',
      duration: '7h 30m',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 458,
        estimatedFuel: 2000,
        tollCharges: 200
      }
    },
    {
      id: 4,
      from: 'Chennai',
      to: 'Salem',
      fare: '₹5,160',
      distance: '340 km',
      duration: '5h 30m',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 340,
        estimatedFuel: 1500,
        tollCharges: 150
      }
    },
    {
      id: 5,
      from: 'Chennai',
      to: 'Tiruchirappalli',
      fare: '₹4,880',
      distance: '320 km',
      duration: '5h',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 320,
        estimatedFuel: 1400,
        tollCharges: 100
      }
    },
    {
      id: 6,
      from: 'Chennai',
      to: 'Thanjavur',
      fare: '₹5,300',
      distance: '350 km',
      duration: '6h',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 350,
        estimatedFuel: 1550,
        tollCharges: 150
      }
    },
    {
      id: 7,
      from: 'Madurai',
      to: 'Coimbatore',
      fare: '₹3,480',
      distance: '220 km',
      duration: '3h 30m',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 220,
        estimatedFuel: 1000,
        tollCharges: 80
      }
    },
    {
      id: 8,
      from: 'Salem',
      to: 'Chennai',
      fare: '₹5,160',
      distance: '340 km',
      duration: '5h 30m',
      breakdown: {
        baseFare: 400,
        perKmRate: 14,
        driverAllowance: 400,
        totalKm: 340,
        estimatedFuel: 1500,
        tollCharges: 150
      }
    }
  ];

  const handleViewDetails = (route) => {
    setSelectedRoute(route);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoute(null);
  };

  return (
    <>
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

              <button 
                onClick={() => handleViewDetails(route)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 group shadow-md"
              >
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
                href="tel:+917418332789" 
                className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105"
              >
                <Phone className="inline h-5 w-5 mr-2" />
                Call +91 7418332789
              </a>
              <a 
                href="https://wa.me/917418332789" 
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

      {/* Route Details Modal */}
      {showModal && selectedRoute && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Route Details</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{selectedRoute.from}</span>
                    <ArrowRight className="h-5 w-5" />
                    <span className="text-lg">{selectedRoute.to}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Trip Overview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                  <Calculator className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-600 mb-1">{selectedRoute.fare}</div>
                  <div className="text-sm text-gray-600">Total Fare</div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">{selectedRoute.distance}</div>
                  <div className="text-sm text-gray-600">Distance</div>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600 mb-1">{selectedRoute.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
              </div>

              {/* Fare Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 text-blue-600 mr-2" />
                  Fare Breakdown
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Distance ({selectedRoute.breakdown.totalKm} km × ₹{selectedRoute.breakdown.perKmRate}/km)</span>
                    <span className="font-semibold">₹{selectedRoute.breakdown.totalKm * selectedRoute.breakdown.perKmRate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Driver Allowance</span>
                    <span className="font-semibold">₹{selectedRoute.breakdown.driverAllowance}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Estimated Fuel</span>
                    <span className="font-semibold">₹{selectedRoute.breakdown.estimatedFuel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Toll Charges (Estimated)</span>
                    <span className="font-semibold">₹{selectedRoute.breakdown.tollCharges}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-green-100 px-4 rounded-lg border-2 border-green-200">
                    <span className="text-lg font-bold text-green-800">Total Fare</span>
                    <span className="text-2xl font-bold text-green-600">{selectedRoute.fare}</span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                <h5 className="font-semibold text-yellow-800 mb-2">Important Notes:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Toll charges are estimated and may vary</li>
                  <li>• Fuel prices subject to market rates</li>
                  <li>• Driver allowance includes food and accommodation</li>
                  <li>• GST applicable as per government rates</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+917418332789" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call +91 7418332789</span>
                </a>
                <a 
                  href="https://wa.me/917418332789" 
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MostBookedRoutes;
