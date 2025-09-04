import React from 'react';
import { MapPin, Clock, Star, ArrowRight, Mountain, Building, Waves, TreePine } from 'lucide-react';

const CoimbatoreDestinations = () => {
  const destinations = [
    {
      name: 'Ooty (Udhagamandalam)',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '85 km',
      duration: '2.5 hours',
      description: 'Queen of Hill Stations with tea gardens and pleasant weather',
      fare: '₹1,800',
      icon: Mountain,
      highlights: ['Botanical Garden', 'Tea Museum', 'Toy Train', 'Doddabetta Peak'],
      category: 'Hill Station'
    },
    {
      name: 'Coonoor',
      image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '70 km',
      duration: '2 hours',
      description: 'Charming hill station with tea estates and viewpoints',
      fare: '₹1,500',
      icon: Mountain,
      highlights: ['Sim\'s Park', 'Lamb\'s Rock', 'Tea Estates', 'Nilgiri Mountain Railway'],
      category: 'Hill Station'
    },
    {
      name: 'Valparai',
      image: 'https://images.pexels.com/photos/1007425/pexels-photo-1007425.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '100 km',
      duration: '3 hours',
      description: 'Scenic hill station with tea and coffee plantations',
      fare: '₹2,200',
      icon: TreePine,
      highlights: ['Tea Plantations', 'Aliyar Dam', 'Monkey Falls', 'Sholayar Dam'],
      category: 'Hill Station'
    },
    {
      name: 'Pollachi',
      image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '40 km',
      duration: '1 hour',
      description: 'Gateway to hill stations with coconut groves',
      fare: '₹900',
      icon: TreePine,
      highlights: ['Coconut Research Station', 'Aliyar Dam', 'Parambikulam Wildlife', 'Film City'],
      category: 'Town'
    },
    {
      name: 'Palani',
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '65 km',
      duration: '1.5 hours',
      description: 'Famous temple town with Murugan temple on hilltop',
      fare: '₹1,400',
      icon: Building,
      highlights: ['Palani Murugan Temple', 'Ropeway', 'Thiru Avinankudi Temple', 'Hill Views'],
      category: 'Temple Town'
    },
    {
      name: 'Mettupalayam',
      image: 'https://images.pexels.com/photos/1007428/pexels-photo-1007428.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '35 km',
      duration: '45 minutes',
      description: 'Base station for Nilgiri Mountain Railway to Ooty',
      fare: '₹800',
      icon: Mountain,
      highlights: ['Nilgiri Mountain Railway', 'Steam Engine Museum', 'Bhavani River', 'Gateway to Ooty'],
      category: 'Railway Town'
    },
    {
      name: 'Anamalai Tiger Reserve',
      image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '90 km',
      duration: '2.5 hours',
      description: 'Wildlife sanctuary with elephants and tigers',
      fare: '₹2,000',
      icon: TreePine,
      highlights: ['Tiger Safari', 'Elephant Spotting', 'Trekking Trails', 'Parambikulam Dam'],
      category: 'Wildlife'
    },
    {
      name: 'Siruvani Waterfalls',
      image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '37 km',
      duration: '1 hour',
      description: 'Beautiful waterfalls with crystal clear water',
      fare: '₹850',
      icon: Waves,
      highlights: ['Waterfalls', 'Trekking', 'Natural Pools', 'Forest Views'],
      category: 'Nature'
    },
    {
      name: 'Monkey Falls',
      image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '65 km',
      duration: '2 hours',
      description: 'Scenic waterfall on the way to Valparai',
      fare: '₹1,400',
      icon: Waves,
      highlights: ['Waterfall Swimming', 'Photography', 'Trekking', 'Natural Beauty'],
      category: 'Nature'
    },
    {
      name: 'Topslip',
      image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '75 km',
      duration: '2 hours',
      description: 'Wildlife sanctuary with elephant camps',
      fare: '₹1,650',
      icon: TreePine,
      highlights: ['Elephant Camp', 'Wildlife Safari', 'Bamboo Rafting', 'Nature Walks'],
      category: 'Wildlife'
    },
    {
      name: 'Kodiveri Dam',
      image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '25 km',
      duration: '40 minutes',
      description: 'Scenic dam with boating and picnic spots',
      fare: '₹600',
      icon: Waves,
      highlights: ['Boating', 'Picnic Spots', 'Dam Views', 'Photography'],
      category: 'Dam'
    },
    {
      name: 'Velliangiri Hills',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '30 km',
      duration: '45 minutes',
      description: 'Sacred hills with trekking trails and temples',
      fare: '₹700',
      icon: Mountain,
      highlights: ['Trekking', 'Isha Yoga Center', 'Dhyanalinga', 'Spiritual Journey'],
      category: 'Spiritual'
    }
  ];

  const categories = ['All', 'Hill Station', 'Temple Town', 'Wildlife', 'Nature', 'Spiritual'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredDestinations = selectedCategory === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Coimbatore Top Destinations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the best destinations around Coimbatore with 1waytaxi. From hill stations to wildlife sanctuaries, 
            discover the natural beauty and cultural heritage of Tamil Nadu.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <destination.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {destination.fare}
                  </div>
                  <div className="bg-blue-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mt-2">
                    {destination.category}
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-2">{destination.name}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{destination.distance}</span>
                    </div>
                    <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{destination.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Key Attractions:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 group shadow-lg transform hover:scale-105">
                  <span>Book Trip</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Explore Coimbatore's Best?</h3>
            <p className="text-xl mb-8 opacity-90">
              Book your local outstation trip with 1waytaxi - Professional drivers who know every route
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:+917810095200" 
                className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105"
              >
                Call +91 78100 95200
              </a>
              <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-colors backdrop-blur-sm">
                Get Instant Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoimbatoreDestinations;