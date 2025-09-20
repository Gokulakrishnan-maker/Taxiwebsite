import React from "react";
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Globe, Smartphone, Search, Code, Palette, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const GkWebDesigns = () => {
  return (
    <>
      <Helmet>
        <title>Gk WebDesigns - Professional Web Development & Design Services</title>
        <meta name="description" content="Gk WebDesigns specializes in modern, user-friendly websites and applications. Expert web development, SEO optimization, and digital solutions for businesses." />
        <meta name="keywords" content="web design, web development, SEO, digital marketing, responsive design, custom websites, mobile apps" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1waytaxi.com/gk-web-designs" />
        
        <meta property="og:title" content="Gk WebDesigns - Professional Web Development Services" />
        <meta property="og:description" content="Expert web development, design, and digital solutions for modern businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1waytaxi.com/gk-web-designs" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to 1waytaxi
            </Link>
            
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Gk WebDesigns
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Crafting modern, user-friendly, and high-performance websites that help businesses grow and engage with their customers effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive digital solutions for modern businesses</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Globe className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Website Design</h3>
                <p className="text-gray-600">Modern, responsive websites that look great on all devices and convert visitors into customers.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Smartphone className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Apps</h3>
                <p className="text-gray-600">Custom mobile applications for iOS and Android that provide seamless user experiences.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Search className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">SEO Optimization</h3>
                <p className="text-gray-600">Improve your search engine rankings and drive more organic traffic to your website.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Code className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Development</h3>
                <p className="text-gray-600">Tailored web applications and software solutions built with the latest technologies.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Palette className="h-12 w-12 text-pink-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">UI/UX Design</h3>
                <p className="text-gray-600">Beautiful, intuitive user interfaces that provide exceptional user experiences.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Optimization</h3>
                <p className="text-gray-600">Fast-loading websites optimized for speed, performance, and user satisfaction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Gk WebDesigns</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
              <p>
                At <span className="font-semibold text-blue-600">Gk WebDesigns</span>, we specialize in 
                crafting modern, user-friendly, and high-performance websites and 
                applications. Our focus is on delivering tailored digital solutions 
                that help businesses grow and engage with their customers effectively.
              </p>

              <p>
                From <span className="font-medium text-green-600">website design</span> and 
                <span className="font-medium text-purple-600"> SEO optimization</span> to 
                <span className="font-medium text-red-600"> custom web apps</span>, we bring ideas 
                to life using the latest technologies and creative strategies.
              </p>

              <p>
                Whether you're a startup or an established brand, we are here to 
                transform your digital presence into something impactful and effective.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-green-100 mb-8">
              Let's discuss how we can help transform your digital presence
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/916379456651"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>💬</span>
                <span>Contact Us on WhatsApp</span>
              </a>
              
              <Link
                to="/"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to 1waytaxi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GkWebDesigns;