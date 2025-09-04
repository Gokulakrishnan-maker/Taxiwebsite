import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Fleet from './components/Fleet';
import CoimbatoreDestinations from './components/CoimbatoreDestinations';
import OutstationDestinations from './components/OutstationDestinations';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import FAQ from './components/FAQ';

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Fleet />
    <CoimbatoreDestinations />
    <OutstationDestinations />
    <Testimonials />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Premium Taxi Service Banner */}
        <div className="text-center py-6 bg-gray-50">
          <h1 className="text-3xl font-bold">
            🚖 1waytaxi - Premium Taxi Service All Over Tamil Nadu
          </h1>
          <p className="mt-2 text-gray-600">
            Book reliable local and outstation cabs across Coimbatore, Chennai, Madurai, Trichy, 
            Salem and more. Transparent pricing. Available 24/7.
          </p>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}


    

export default App;
