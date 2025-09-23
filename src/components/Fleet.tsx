import React from 'react';
import { Users, Luggage, Wifi, Snowflake } from 'lucide-react';

const Fleet = () => {
  const vehicles = [
    {
      name: 'SEDAN',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
      passengers: '1-4',
      luggage: '2 bags',
      features: ['Air Conditioning', 'GPS Tracking', 'Phone Charger'],
      
    },
    {
      name: 'ETIOS',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400',
      passengers: '1-4',
      luggage: '2 bags',
      features: ['Air Conditioning', 'GPS Tracking', 'Comfortable Seating'],
     
    },
    {
      name: 'SUV',
      image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400',
      passengers: '1-6',
      luggage: '4 bags',
      features: ['Luxury Interior', 'WiFi Available', 'Extra Space'],
      
    },
    {
      name: 'INNOVA',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
      passengers: '1-8',
      luggage: '3 bags',
      features: ['Premium Comfort', 'Business Amenities', 'Professional Driver'],
     
    }
  ];

  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Fleet</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse fleet of well-maintained vehicles to match your travel needs and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.name} - Professional taxi service`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error(`Failed to load image for ${vehicle.name}:`, vehicle.image);
                    e.target.style.display = 'none';
                  }}
                />
               </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{vehicle.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{vehicle.passengers}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Luggage className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{vehicle.luggage}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {vehicle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Select Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
