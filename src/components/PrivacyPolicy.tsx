import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - 1waytaxi | Secure Taxi Service in Tamil Nadu</title>
        <meta name="description" content="1waytaxi Privacy Policy - Learn how we protect your personal information, location data, and ensure secure taxi booking across Tamil Nadu. GDPR compliant taxi service." />
        <meta name="keywords" content="1waytaxi privacy policy, data protection, secure taxi booking, Tamil Nadu taxi privacy, GDPR compliance, personal information security" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1waytaxi.com/privacy-policy" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Privacy Policy - 1waytaxi | Secure Taxi Service" />
        <meta property="og:description" content="Learn how 1waytaxi protects your personal information and ensures secure taxi booking across Tamil Nadu." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1waytaxi.com/privacy-policy" />
        <meta property="og:site_name" content="1waytaxi" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - 1waytaxi" />
        <meta name="twitter:description" content="Learn how 1waytaxi protects your personal information and ensures secure taxi booking." />
        
        {/* Structured Data for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy - 1waytaxi",
            "description": "1waytaxi Privacy Policy - Data protection and security information for taxi booking service in Tamil Nadu",
            "url": "https://1waytaxi.com/privacy-policy",
            "isPartOf": {
              "@type": "WebSite",
              "name": "1waytaxi",
              "url": "https://1waytaxi.com"
            },
            "about": {
              "@type": "Organization",
              "name": "1waytaxi",
              "description": "Professional taxi service across Tamil Nadu",
              "telephone": "+91-7418332789",
              "email": "1waytaxi.booking@gmail.com"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-blue-600 mr-2" />
                Information We Collect
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name, phone number, and email address for booking</li>
                  <li>Pickup and dropoff locations for trip planning</li>
                  <li>Payment information for transaction processing</li>
                  <li>Trip history and preferences for better service</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Location Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>GPS location for accurate pickup and navigation</li>
                  <li>Route information for fare calculation</li>
                  <li>Real-time tracking during trips for safety</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Service Delivery</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Process and fulfill your taxi bookings</li>
                    <li>• Provide real-time trip tracking</li>
                    <li>• Calculate accurate fares and routes</li>
                    <li>• Send booking confirmations and updates</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Safety & Support</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Ensure passenger and driver safety</li>
                    <li>• Provide customer support assistance</li>
                    <li>• Improve service quality and reliability</li>
                    <li>• Comply with transportation regulations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 text-blue-600 mr-2" />
                Data Protection
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Encrypted data transmission and storage</li>
                  <li>Secure payment processing through certified gateways</li>
                  <li>Limited access to personal data on need-to-know basis</li>
                  <li>Regular security audits and updates</li>
                  <li>Compliance with Indian data protection laws</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Access</h3>
                  <p className="text-gray-600 text-sm">Request access to your personal data</p>
                </div>
                <div className="bg-white border-2 border-green-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Correction</h3>
                  <p className="text-gray-600 text-sm">Update or correct your information</p>
                </div>
                <div className="bg-white border-2 border-red-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Deletion</h3>
                  <p className="text-gray-600 text-sm">Request deletion of your data</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For any privacy-related questions or concerns about 1waytaxi, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Phone:</strong> +91 7418332789</p>
                  <p><strong>Email:</strong> 1waytaxi.booking@gmail.com</p>
                  <p><strong>Address:</strong> Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
