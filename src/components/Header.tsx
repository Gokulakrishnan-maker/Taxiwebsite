import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/image.png.png"
              alt="Taxi Logo"
              className="h-16 w-auto"
            />
            <span className="text-2xl font-bold text-gray-900">
              1WayTaxi
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#fleet" className="text-gray-700 hover:text-blue-600 transition-colors">Fleet</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* Running Phone Number */}
          <div className="hidden md:flex items-center overflow-hidden w-56 h-10 bg-blue-50 rounded-lg relative">
            <div className="flex items-center space-x-2 text-blue-600 font-semibold animate-marquee">
              <Phone className="h-4 w-4" />
              <span>+91 7810095200</span>
              <Phone className="h-4 w-4 ml-8" />
              <span>+91 7810095200</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#fleet" className="text-gray-700 hover:text-blue-600 transition-colors">Fleet</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>

              {/* Running Phone Number in Mobile */}
              <div className="overflow-hidden w-full h-10 bg-blue-50 rounded-lg relative">
                <div className="flex items-center space-x-2 text-blue-600 font-semibold animate-marquee">
                  <Phone className="h-4 w-4" />
                  <span>+91 7810095200</span>
                  <Phone className="h-4 w-4 ml-8" />
                  <span>+91 7810095200</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: flex;
            white-space: nowrap;
            animation: marquee 12s linear infinite;
          }
        `}
      </style>
    </header>
  );
};

export default Header;

