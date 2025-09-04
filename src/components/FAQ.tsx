import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Phone, Clock, MapPin, AtSign } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      category: "Booking & Reservations",
      icon: Phone,
      questions: [
        {
          question: "How can I book a taxi with 1waytaxi?",
          answer: "You can book through our website, call +91 78100 95200, or use our mobile app. We accept advance bookings and immediate pickup requests based on availability."
        },
        {
          question: "How far in advance can I book a taxi?",
          answer: "You can book up to 30 days in advance for local trips and up to 15 days for outstation journeys. We recommend booking at least 2 hours ahead for guaranteed availability."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel bookings up to 15 minutes before pickup time without charges. After driver dispatch, a ₹50 cancellation fee applies."
        }
      ]
    },
    {
      category: "Pricing & Payments",
      icon: Clock,
      questions: [
        {
          question: "How is the fare calculated?",
          answer: "Fares are calculated based on distance (₹18-35/km depending on vehicle type), base fare (₹50), and additional charges like AC (₹3/km), night surcharge (25% between 11 PM - 5 AM), and waiting time (₹2/min)."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, UPI payments (PhonePe, Google Pay, Paytm), credit/debit cards, and net banking. Payment can be made to the driver or through our app."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No hidden charges! Our pricing is completely transparent. Additional costs like tolls, parking fees, or outstation driver allowance are clearly communicated upfront."
        }
      ]
    },
    {
      category: "Service Areas & Routes",
      icon: MapPin,
      questions: [
        {
          question: "Which areas do you cover in Coimbatore?",
          answer: "We cover all areas within Coimbatore city including RS Puram, Gandhipuram, Peelamedu, Saibaba Colony, Race Course, Singanallur, and surrounding suburbs."
        },
        {
          question: "Do you provide outstation services?",
          answer: "Yes! We provide outstation services across Tamil Nadu including Chennai, Bangalore, Madurai, Ooty, Kodaikanal, and other major cities. Driver allowance and accommodation charges apply for multi-day trips."
        },
        {
          question: "What about airport transfers?",
          answer: "We provide 24/7 airport transfer services to/from Coimbatore Airport. Fixed rates available with advance booking. Flight tracking included for arrival pickups."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about 1waytaxi services
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <div className="flex items-center space-x-3">
                  <category.icon className="h-6 w-6" />
                  <h2 className="text-xl font-bold">{category.category}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    return (
                      <div key={faqIndex} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900">{faq.question}</span>
                          {openFAQ === globalIndex ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {openFAQ === globalIndex && (
                          <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-700 mb-6">
            Can't find what you're looking for? Our customer support team is available 24/7 to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+917810095200" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Call +91 78100 95200
            </a>
            <a 
              href="mailto:kovaidroptaxi38@gmail.com" 
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center space-x-2"
            >
              <AtSign className="h-4 w-4" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;