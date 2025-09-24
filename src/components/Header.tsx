import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation Variants
  const navItem = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/image.png.png"
                alt="Taxi Logo"
                className="h-20 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900"></span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Services", "Fleet", "Pricing", "Contact"].map(
              (item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  variants={navItem}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {item}
                </motion.a>
              )
            )}
          </nav>

          {/* Phone Number with Pulse Animation */}
          <motion.div
            className="hidden md:flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Phone className="h-4 w-4" />
            </motion.div>
            <span className="font-semibold">+91 7418332789</span>
          </motion.div>

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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden py-4 border-t"
          >
            <nav className="flex flex-col space-y-4">
              {["Home", "Services", "Fleet", "Pricing", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {item}
                </a>
              ))}

              {/* Mobile Phone */}
              <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                <Phone className="h-4 w-4 animate-bounce" />
                <span className="font-semibold">+91 7418332789</span>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;

