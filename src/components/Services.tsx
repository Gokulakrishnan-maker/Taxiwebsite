import React from 'react';
import { Clock, Shield, Star, Headphones } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock service across Coimbatore with immediate pickup and reliable scheduling for local and outstation trips.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Government licensed drivers, live GPS tracking, and comprehensive insurance coverage for safe travel across Tamil Nadu.'
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Well-maintained vehicles, experienced local drivers, and exceptional customer service for comfortable journeys.'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Tamil and English speaking support team available 24/7 for bookings, route guidance, and travel assistance.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose 1waytaxi?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with 1waytaxi's premium service in Coimbatore. Licensed by Tamil Nadu Transport Department, we provide safe, reliable transportation across the state with local expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <service.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;