// Notification utilities for booking enquiries

// Generate unique booking ID
export const generateBookingId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Get user's IP address (simplified for demo)
export const getUserIP = (): string => {
  // In a real application, you would get this from a service
  return 'Dynamic IP Address';
};

// Calculate distance and duration (mock data for now)
export const getTripDetails = (from: string, to: string) => {
  // This would normally use Google Maps API
  return {
    distance: '0 KM', // Will be calculated
    duration: '0 mins', // Will be calculated
    fare: 0 // Will be calculated
  };
};

export interface BookingEnquiry {
  tripType: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: string;
  customerPhone?: string;
  customerName?: string;
  fareEstimate?: number;
  bookingId?: string;
  vehicleType?: string;
}

// Format booking details for WhatsApp message
export const formatWhatsAppMessage = (booking: BookingEnquiry): string => {
  const message = `🚖 *NEW BOOKING ENQUIRY - 1waytaxi*

📋 *Trip Details:*
• Trip Type: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
• From: ${booking.from}
• To: ${booking.to}
• Date: ${booking.date}
• Time: ${booking.time}
• Passengers: ${booking.passengers}

💰 *Estimated Fare:* ${booking.fareEstimate ? `₹${booking.fareEstimate}` : 'To be calculated'}

👤 *Customer Info:*
• Name: ${booking.customerName || 'Not provided'}
• Phone: ${booking.customerPhone || 'Not provided'}

⏰ *Enquiry Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please contact the customer to confirm booking details.`;

  return encodeURIComponent(message);
};

// Send WhatsApp notification
export const sendWhatsAppNotification = (booking: BookingEnquiry): void => {
  const message = formatWhatsAppMessage(booking);
  const whatsappUrl = `https://wa.me/917810095200?text=${message}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

// Format booking details for email
export const formatDetailedEmailContent = (booking: BookingEnquiry): { subject: string; body: string } => {
  const bookingId = booking.bookingId || generateBookingId();
  const currentDateTime = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const subject = `Website Enquiry Details - Booking ID: ${bookingId}`;
  
  const body = `Website Enquiry Details
Booking ID#
${bookingId}

Thanks for Choosing 1waytaxi

Booking Details
Booking ID: ${bookingId}
Name: ${booking.customerName || 'Not Provided'}
Email ID: ${booking.customerPhone ? 'Provided via Phone' : 'NA'}
Phone: ${booking.customerPhone || 'Not Provided'}
Pickup Location: ${booking.from}
Drop Location: ${booking.to}
Vehicle Type: ${booking.vehicleType || 'SEDAN'}
Journey Type: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
Travel Date & Time: ${booking.date} ${booking.time}
Trip Distance: To be calculated
Trip Duration: To be calculated (Approx)
Extra per KM: ₹ 18
Driver Allowance: INCLUDED
Toll: EXTRA
Total Trip Fare: ${booking.fareEstimate ? `₹ ${booking.fareEstimate}` : 'To be calculated'} (Driver Allowance Included)

For Customer Intimation: Toll Gate, Permit, Hill Station Charges Extra

For Question Contact: +91 78100 95200
www.1waytaxi.com

IP ADDRESS: ${getUserIP()}
ENQUIRY TIME: ${currentDateTime}

TOTAL
${booking.fareEstimate ? `₹ ${booking.fareEstimate}` : 'To be calculated'}

Please contact the customer immediately to confirm booking details and provide accurate fare calculation.`;

  return { subject, body };
};

// Send email notification
export const sendEmailNotification = (booking: BookingEnquiry): void => {
  const { subject, body } = formatDetailedEmailContent(booking);
  const emailUrl = `mailto:1waytaxi.booking@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open email client
  window.open(emailUrl, '_blank');
};

// Send both notifications
export const sendBookingNotifications = (booking: BookingEnquiry): void => {
  // Send WhatsApp notification
  sendWhatsAppNotification(booking);
  
  // Small delay before opening email to avoid popup blocking
  setTimeout(() => {
    sendEmailNotification(booking);
  }, 1000);
};

// Show success message to customer
export const showBookingConfirmation = (booking: BookingEnquiry): void => {
  const bookingId = booking.bookingId || generateBookingId();
  const fareText = booking.fareEstimate ? `Estimated fare: ₹${booking.fareEstimate}` : 'Fare will be calculated based on actual distance';
  
  alert(`🚖 Booking Enquiry Submitted Successfully!

Booking ID: ${bookingId}

${fareText}

Our team has been notified and will contact you shortly at +91 78100 95200 to confirm your booking details.

Trip: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
From: ${booking.from}
To: ${booking.to}
Date: ${booking.date} at ${booking.time}

Thank you for choosing 1waytaxi!`);
};