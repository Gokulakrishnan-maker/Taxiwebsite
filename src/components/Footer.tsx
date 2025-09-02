import React from 'react';
import { Car, Phone, Mail, MapPin, Facebook, Send, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold">Kovai Drop Taxi</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Your trusted Kovai Drop Taxi service providing safe, reliable, and comfortable transportation 
              across Coimbatore and Tamil Nadu. Available 24/7 for local and outstation trips.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-orange-400 transition-colors">Services</a></li>
              <li><a href="#fleet" className="text-gray-300 hover:text-orange-400 transition-colors">Our Fleet</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-orange-400 transition-colors">Pricing</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">+91 74186 40616</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">info@urbanwheels.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">Coimbatore, Tamil Nadu</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-orange-500 rounded-lg">
              <h5 className="font-semibold mb-2">24/7 Emergency</h5>
              <p className="text-sm">Call anytime for immediate assistance</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Kovai Drop Taxi. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
