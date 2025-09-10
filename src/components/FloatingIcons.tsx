import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingIcons = () => {
  return (
    <>
      {/* WhatsApp Floating Icon - Left */}
      <div className="fixed left-6 bottom-6 z-50">
        <a
          href="https://wa.me/917810095200"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
          title="WhatsApp Us"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            WhatsApp Us
          </div>
        </a>
      </div>

      {/* Phone Floating Icon - Right */}
      <div className="fixed right-6 bottom-6 z-50">
        <a
          href="tel:+917810095200"
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
          title="Call Us"
        >
          <Phone className="h-6 w-6" />
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Call +91 7810095200
          </div>
        </a>
      </div>
    </>
  );
};

export default FloatingIcons;