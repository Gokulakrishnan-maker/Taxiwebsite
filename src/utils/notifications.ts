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
  tripDistance?: string;
  tripDuration?: string;
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
  
  const subject = `CONFIRMED BOOKING - Website Enquiry Details - Booking ID: ${bookingId}`;
  
  const body = `CONFIRMED BOOKING - Website Enquiry Details
Booking ID#
${bookingId}

Thanks for Choosing 1wayTaxi

CONFIRMED BOOKING DETAILS
Booking ID: ${bookingId}
Name: ${booking.customerName || 'Not Provided'}
Email ID: NA
Phone: ${booking.customerPhone || 'Not Provided'}
Pickup Location: ${booking.from}
Drop Location: ${booking.to}
Vehicle Type: ${booking.vehicleType || 'SEDAN'}
Journey Type: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
Travel Date & Time: ${booking.date} ${booking.time}
Trip Distance: ${booking.tripDistance || 'To be calculated'}
Trip Duration: ${booking.tripDuration || 'To be calculated (Approx)'}
Extra per KM: ₹ 14
Driver Allowance: ₹ 400 (INCLUDED)
Toll: EXTRA
Total Trip Fare: ${booking.fareEstimate ? `₹ ${booking.fareEstimate}` : 'To be calculated'} (Driver Allowance Included)

For Customer Intimation: Toll Gate, Permit, Hill Station Charges Extra

For Question Contact: +91 78100 95200
www.1waytaxi.com

IP ADDRESS: ${getUserIP()}
BOOKING CONFIRMED TIME: ${currentDateTime}

STATUS: CONFIRMED - Customer has accepted the fare estimation and confirmed the booking.

TOTAL
${booking.fareEstimate ? `₹ ${booking.fareEstimate}` : 'To be calculated'}

BOOKING CONFIRMED - Please arrange the vehicle and contact customer at ${booking.customerPhone} for pickup coordination.`;

  return { subject, body };
};

// Send email notification
export const sendEmailNotification = (booking: BookingEnquiry): void => {
  const { subject, body } = formatDetailedEmailContent(booking);
  
  const emailAddress = '1waytaxi.booking@gmail.com';
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  const emailUrl = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
  
  // Create multiple email attempts
  console.log('Attempting to send email notification...');
  console.log('Email URL:', emailUrl);
  
  // Method 1: Direct window location
  window.location.href = emailUrl;
  
  // Method 2: Backup with new window
  setTimeout(() => {
    window.open(emailUrl, '_blank');
  }, 500);
  
  // Method 3: Create and click hidden link
  setTimeout(() => {
    const emailLink = document.createElement('a');
    emailLink.href = emailUrl;
    emailLink.style.display = 'none';
    emailLink.target = '_blank';
    document.body.appendChild(emailLink);
    emailLink.click();
    document.body.removeChild(emailLink);
  }, 1000);
  
  // Method 4: Show manual instructions
  setTimeout(() => {
    alert(`📧 IMPORTANT: Email notification sent to 1waytaxi.booking@gmail.com

If your email client didn't open automatically:
1. Open your email app manually
2. Send email to: 1waytaxi.booking@gmail.com
3. Subject: ${subject}
4. Include all booking details

Booking ID: ${booking.bookingId}
Customer: ${booking.customerName} (${booking.customerPhone})`);
  }, 2000);
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
  
  alert(`🚖 Ride Booked Successfully

Thanks for Choosing 1wayTaxi, reservation details have been sent to your email id & phone.

Booking ID: ${bookingId}
${booking.fareEstimate ? `Total Fare: ₹${booking.fareEstimate}` : 'Fare will be calculated based on actual distance'}

Our team will contact you shortly at ${booking.customerPhone} to confirm your booking details.

Trip: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
From: ${booking.from}
To: ${booking.to}
Date: ${booking.date} at ${booking.time}

For any queries, call: +91 78100 95200

Thank you for choosing 1wayTaxi!`);
};