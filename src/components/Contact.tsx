import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, AtSign } from 'lucide-react';
import { sendEmailNotification, BookingEnquiry } from '../utils/notifications';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create enquiry object for email notification
    const enquiry: BookingEnquiry = {
      tripType: 'general_enquiry',
      from: 'Contact Form',
      to: 'General Enquiry',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      passengers: '1',
      customerName: contactForm.name,
      customerPhone: contactForm.phone
    };

    // Send email notification with contact form details
    const emailContent = {
      subject: `New Contact Form Enquiry - ${contactForm.name}`,
      body: `Dear 1waytaxi Team,

A new enquiry has been received through the contact form.

CUSTOMER DETAILS:
- Name: ${contactForm.name}
- Email: ${contactForm.email}
- Phone: ${contactForm.phone}

MESSAGE:
${contactForm.message}

ENQUIRY TIME: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please respond to the customer as soon as possible.

Best regards,
1waytaxi Contact System`
    };

    const emailUrl = `mailto:1waytaxi.booking@gmail.com?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    const emailUrl = `mailto:kovaidroptaxi38@gmail.com?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    window.open(emailUrl, '_blank');
    
    // WhatsApp notification for contact form
    const whatsappMessage = `🔔 *NEW CONTACT FORM ENQUIRY*

👤 *Customer Details:*
• Name: ${contactForm.name}
• Email: ${contactForm.email}
• Phone: ${contactForm.phone}

💬 *Message:*
${contactForm.message}

⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please respond to the customer promptly.`;

    const whatsappUrl = `https://wa.me/917810095200?text=${encodeURIComponent(whatsappMessage)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
    
    alert('✅ Thank you for your message! We have been notified and will get back to you shortly.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 78100 95200',
      description: '24/7 booking and support'
    },
    {
      icon: AtSign,
      title: 'Email Us',
     details: '1waytaxi.booking@gmail.com',
      description: 'For general inquiries'
    },
    {
      icon: MapPin,
      title: 'Service Area',
      details: 'Coimbatore & TamilNadu',
      description: 'Local & outstation trips'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: '24/7 Service',
      description: 'Always available'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help 24/7. Reach out to us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <info.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                  <p className="text-blue-600 font-semibold mb-1">{info.details}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your transportation needs..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Send Message</span>
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
