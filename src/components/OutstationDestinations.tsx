import React from 'react';
import { MapPin, Clock, Star, ArrowRight, Plane, Mountain, Building, Waves } from 'lucide-react';

const OutstationDestinations = () => {
  const destinations = [
    {
      name: 'Chennai',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '500 km',
      duration: '7-8 hours',
      description: 'Capital city with Marina Beach and IT corridor',
      fare: '₹8,500',
      icon: Building,
      highlights: ['Marina Beach', 'Central Railway Station', 'IT Parks', 'Temples']
    },
    {
      name: 'Bangalore',
      image: 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '360 km',
      duration: '6-7 hours',
      description: 'Silicon Valley of India with gardens and tech hubs',
      fare: '₹6,200',
      icon: Building,
      highlights: ['Lalbagh Garden', 'Cubbon Park', 'IT Companies', 'Pubs & Cafes']
    },
    {
      name: 'Ooty',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '85 km',
      duration: '2.5 hours',
      description: 'Queen of Hill Stations with tea gardens',
      fare: '₹1,800',
      icon: Mountain,
      highlights: ['Tea Gardens', 'Botanical Garden', 'Toy Train', 'Lake']
    },
    {
      name: 'Kodaikanal',
      image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '180 km',
      duration: '4 hours',
      description: 'Princess of Hill Stations with pristine lakes',
      fare: '₹3,200',
      icon: Mountain,
      highlights: ['Kodai Lake', 'Coakers Walk', 'Bryant Park', 'Pillar Rocks']
    },
    {
      name: 'Madurai',
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '220 km',
      duration: '4-5 hours',
      description: 'Temple city with Meenakshi Amman Temple',
      fare: '₹3,800',
      icon: Building,
      highlights: ['Meenakshi Temple', 'Thirumalai Nayak Palace', 'Gandhi Museum', 'Local Markets']
    },
    {
      name: 'Kanyakumari',
      image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '450 km',
      duration: '8-9 hours',
      description: 'Southernmost tip with Thiruvalluvar Statue',
      fare: '₹7,800',
      icon: Waves,
      highlights: ['Thiruvalluvar Statue', 'Sunset Point', 'Vivekananda Rock', 'Beach']
    },
    {
      name: 'Mysore',
      image: 'https://images.pexels.com/photos/1098364/pexels-photo-1098364.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '280 km',
      duration: '5-6 hours',
      description: 'City of Palaces with rich heritage',
      fare: '₹4,800',
      icon: Building,
      highlights: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'Silk Sarees']
    },
    {
      name: 'Munnar',
      image: 'https://images.pexels.com/photos/1007425/pexels-photo-1007425.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '160 km',
      duration: '4 hours',
      description: 'Kerala hill station with spice plantations',
      fare: '₹2,800',
      icon: Mountain,
      highlights: ['Tea Plantations', 'Eravikulam Park', 'Mattupetty Dam', 'Spice Gardens']
    },
    {
      name: 'Pondicherry',
      image: 'https://images.pexels.com/photos/3581370/pexels-photo-3581370.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '380 km',
      duration: '6-7 hours',
      description: 'French colonial town with beaches',
      fare: '₹6,500',
      icon: Waves,
      highlights: ['French Quarter', 'Auroville', 'Beach Promenade', 'Cafes']
    },
    {
      name: 'Tirupati',
      image: 'https://images.pexels.com/photos/3581367/pexels-photo-3581367.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '420 km',
      duration: '7-8 hours',
      description: 'Sacred temple town with Tirumala Temple',
      fare: '₹7,200',
      icon: Building,
      highlights: ['Tirumala Temple', 'Chandragiri Fort', 'Sri Venkateswara Temple', 'Spiritual Tours']
    },
    {
      name: 'Rameshwaram',
      image: 'https://images.pexels.com/photos/3581371/pexels-photo-3581371.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '320 km',
      duration: '6 hours',
      description: 'Holy island with Ramanathaswamy Temple',
      fare: '₹5,500',
      icon: Waves,
      highlights: ['Ramanathaswamy Temple', 'Pamban Bridge', 'Dhanushkodi', 'Holy Waters']
    },
    {
      name: 'Cochin (Kochi)',
      image: 'https://images.pexels.com/photos/1007428/pexels-photo-1007428.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '190 km',
      duration: '4-5 hours',
      description: 'Queen of Arabian Sea with backwaters',
      fare: '₹3,400',
      icon: Waves,
      highlights: ['Chinese Fishing Nets', 'Fort Kochi', 'Backwaters', 'Spice Markets']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Outstation Destinations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Travel across South India with 1waytaxi. Professional drivers, comfortable vehicles, and transparent pricing for all your outstation needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <destination.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {destination.fare}
                </div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-2xl font-bold mb-1">{destination.name}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{destination.distance}</span>
                    </div>
                    <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{destination.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Popular Attractions:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 group shadow-lg">
                  <span>Book Trip</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h3>
            <p className="text-xl mb-8 opacity-90">
              Book your outstation trip with 1waytaxi - Professional drivers, comfortable vehicles, transparent pricing
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:+917810095200" 
                className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105"
              >
                Call +91 78100 95200
              </a>
              <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-colors backdrop-blur-sm">
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutstationDestinations;