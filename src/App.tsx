import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Fleet from './components/Fleet';
import Tariff from './components/Tariff';
import OutstationDestinations from './components/OutstationDestinations';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import FAQ from './components/FAQ';
import FloatingIcons from './components/FloatingIcons';

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Fleet />
    <Tariff />
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
        <FloatingIcons />
      </div>
    </Router>
    
  );
}


    

export default App;
