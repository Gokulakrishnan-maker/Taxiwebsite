import React from 'react';
import { CheckCircle, MapPin } from 'lucide-react';

const Pricing = () => {
  const routes = [
    {
      from: 'Coimbatore Junction',
      to: 'Coimbatore Airport',
      distance: '12 km',
      duration: '25 min',
      price: '₹350'
    },
    {
      from: 'RS Puram',
      to: 'Brookefields Mall',
      distance: '8 km',
      duration: '18 min',
      price: '₹200'
    },
    {
      from: 'Gandhipuram',
      to: 'Codissia Complex',
      distance: '15 km',
      duration: '30 min',
      price: '₹280'
    },
    {
      from: 'Peelamedu',
      to: 'Singanallur',
      distance: '6 km',
      duration: '12 min',
      price: '₹150'
    }
  ];

  const intercityRoutes = [
    {
      from: 'Coimbatore',
      to: 'Chennai',
      distance: '500 km',
      duration: '7-8 hours',
      price: '₹8,500'
    },
    {
      from: 'Coimbatore',
      to: 'Bangalore',
      distance: '360 km',
      duration: '6-7 hours',
      price: '₹6,200'
    },
    {
      from: 'Coimbatore',
      to: 'Madurai',
      distance: '220 km',
      duration: '4-5 hours',
      price: '₹3,800'
    },
    {
      from: 'Coimbatore',
      to: 'Ooty',
      distance: '85 km',
      duration: '2.5-3 hours',
      price: '₹1,800'
    }
  ];

  const features = [
    'No hidden fees or surge pricing',
    'Professional licensed drivers',
    'Clean and comfortable vehicles',
    'Real-time GPS tracking',
    'Multiple payment options',
    '24/7 customer support'
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fair and competitive rates with no hidden charges. Know exactly what you'll pay before you book.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Popular Routes</h3>
            <div className="space-y-4">
              {routes.map((route, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{route.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{route.distance}</span>
                    <span>{route.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">What's Included</h3>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Base Rate Structure</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Base fare: ₹50</p>
                  <p>• Per kilometer: ₹18-25</p>
                  <p>• Waiting time: ₹2/min</p>
                  <p>• Night surcharge (11 PM - 5 AM): 25%</p>
                  <p>• AC surcharge: ₹3/km</p>
                </div>
              </div>

              <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Intercity & Outstation Fares</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {intercityRoutes.map((route, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{route.from}</h4>
                    <p className="text-sm text-gray-600">to {route.to}</p>
                  </div>
                  <span className="text-xl font-bold text-green-600">{route.price}</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Distance: {route.distance}</p>
                  <p>Duration: {route.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">*Outstation rates include driver allowance and toll charges</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Outstation Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;