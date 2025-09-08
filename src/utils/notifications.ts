// Notification utilities for booking enquiries
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
export const formatEmailContent = (booking: BookingEnquiry): { subject: string; body: string } => {
  const subject = `New Booking Enquiry - ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'} Trip`;
  
  const body = `Dear 1waytaxi Team,

A new booking enquiry has been received through the website.

TRIP DETAILS:
- Trip Type: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
- From: ${booking.from}
- To: ${booking.to}
- Date: ${booking.date}
- Time: ${booking.time}
- Passengers: ${booking.passengers}

FARE INFORMATION:
- Estimated Fare: ${booking.fareEstimate ? `₹${booking.fareEstimate}` : 'To be calculated based on actual distance'}

CUSTOMER INFORMATION:
- Name: ${booking.customerName || 'Not provided'}
- Phone: ${booking.customerPhone || 'Not provided'}

ENQUIRY DETAILS:
- Enquiry Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
- Source: Website Booking Form

Please contact the customer as soon as possible to confirm the booking and provide final fare details.

Best regards,
1waytaxi Booking System`;

  return { subject, body };
};

// Send email notification
export const sendEmailNotification = (booking: BookingEnquiry): void => {
  const { subject, body } = formatEmailContent(booking);
  const emailUrl = `mailto:kovaidroptaxi38@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
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
  const fareText = booking.fareEstimate ? `Estimated fare: ₹${booking.fareEstimate}` : 'Fare will be calculated based on actual distance';
  
  alert(`🚖 Booking Enquiry Submitted Successfully!

${fareText}

Our team has been notified and will contact you shortly at +91 78100 95200 to confirm your booking details.

Trip: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
From: ${booking.from}
To: ${booking.to}
Date: ${booking.date} at ${booking.time}

Thank you for choosing 1waytaxi!`);
};