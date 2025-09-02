import React from 'react';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';

const PopularPlaces = () => {
  const coimbatorePlaces = [
    {
      name: 'Isha Yoga Center',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '15 km from city center',
      duration: '30 min',
      description: 'Spiritual center founded by Sadhguru with Dhyanalinga',
      fare: '₹280'
    },
    {
      name: 'Brookefields Mall',
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '8 km from RS Puram',
      duration: '18 min',
      description: 'Premier shopping and entertainment destination',
      fare: '₹200'
    },
    {
      name: 'Coimbatore Airport',
      image: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '12 km from Junction',
      duration: '25 min',
      description: 'International airport serving Coimbatore',
      fare: '₹350'
    },
    {
      name: 'Marudamalai Temple',
      image: 'https://images.pexels.com/photos/3356489/pexels-photo-3356489.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '15 km from city',
      duration: '30 min',
      description: 'Famous hilltop temple dedicated to Lord Murugan',
      fare: '₹280'
    }
  ];

  const tamilNaduDestinations = [
    {
      name: 'Ooty (Udhagamandalam)',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '85 km from Coimbatore',
      duration: '2.5 hours',
      description: 'Queen of Hill Stations with tea gardens',
      fare: '₹1,800'
    },
    {
      name: 'Kodaikanal',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '180 km from Coimbatore',
      duration: '4 hours',
      description: 'Princess of Hill Stations with pristine lakes',
      fare: '₹3,200'
    },
    {
      name: 'Chennai',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '500 km from Coimbatore',
      duration: '7-8 hours',
      description: 'Capital city with MGR Central Railway Station',
      fare: '₹8,500'
    },
    {
      name: 'Madurai',
      image: 'https://images.pexels.com/photos/3356489/pexels-photo-3356489.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '220 km from Coimbatore',
      duration: '4-5 hours',
      description: 'Temple city with famous Meenakshi Amman Temple',
      fare: '₹3,800'
    },
    {
      name: 'Bangalore',
      image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '360 km from Coimbatore',
      duration: '6-7 hours',
      description: 'IT capital and garden city of India',
      fare: '₹6,200'
    },
    {
      name: 'Kanyakumari',
      image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '450 km from Coimbatore',
      duration: '8-9 hours',
      description: 'Southernmost tip with Thiruvalluvar Statue',
      fare: '₹7,800'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Coimbatore's attractions and travel across Tamil Nadu with our reliable taxi service
          </p>
        </div>

        {/* Coimbatore Local Places */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Places in Coimbatore
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coimbatorePlaces.map((place, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {place.fare}
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{place.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{place.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{place.distance}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{place.duration}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group">
                    <span>Book Ride</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tamil Nadu Destinations */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Outstation Destinations in Tamil Nadu
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tamilNaduDestinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold mb-1">{destination.name}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{destination.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{destination.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {destination.fare}
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Book Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore?</h3>
            <p className="text-gray-600 mb-6">
              Book your ride to any destination in Tamil Nadu with Kovai Drop Taxi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+917418640616" 
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Call +91 74186 40616
              </a>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Get Quote Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPlaces;