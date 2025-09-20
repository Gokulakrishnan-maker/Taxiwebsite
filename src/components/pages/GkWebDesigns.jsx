import React from "react";

const GkWebDesigns = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Gk WebDesigns
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          At <span className="font-semibold">Gk WebDesigns</span>, we specialize in 
          crafting modern, user-friendly, and high-performance websites and 
          applications. Our focus is on delivering tailored digital solutions 
          that help businesses grow and engage with their customers effectively.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          From <span className="font-medium">website design</span> and 
          <span className="font-medium"> SEO optimization</span> to 
          <span className="font-medium"> custom web apps</span>, we bring ideas 
          to life using the latest technologies and creative strategies.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Whether you’re a startup or an established brand, we are here to 
          transform your digital presence into something impactful and effective.
        </p>

        <div className="mt-8">
          <a
            href="https://wa.me/916379456651" // ✅ Correct WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default GkWebDesigns;
