// Notification utilities for booking enquiries

// API base URL for backend
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

// Generate unique booking ID
export const generateBookingId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
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
  customerEmail?: string;
}

// Send booking enquiry email via backend
export const sendBookingEnquiryEmail = async (booking: BookingEnquiry): Promise<boolean> => {
  try {
    console.log('📧 Sending booking enquiry email via backend...');
    
    const response = await fetch(`${API_BASE_URL}/send-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        customerEmail: booking.customerEmail || '',
        tripType: booking.tripType,
        from: booking.from,
        to: booking.to,
        date: booking.date,
        time: booking.time,
        passengers: booking.passengers,
        vehicleType: booking.vehicleType || 'SEDAN',
        tripDistance: booking.tripDistance,
        tripDuration: booking.tripDuration,
        fareEstimate: booking.fareEstimate,
        perKmRate: 18,
        driverAllowance: 400,
        status: 'ENQUIRY'
      })
    });

    console.log('📧 Backend response status:', response.status);
    
    const result = await response.json();
    console.log('📧 Backend response:', result);
    
    if (result.success) {
      console.log('✅ Booking enquiry email sent successfully via backend');
      return true;
    } else {
      console.error('❌ Backend enquiry email sending failed:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending booking enquiry email via backend:', error);
    return false;
  }
};

// Send booking confirmation email via backend
export const sendBookingConfirmationEmail = async (booking: BookingEnquiry): Promise<boolean> => {
  try {
    console.log('📧 Sending booking confirmation email via backend...');
    
    const response = await fetch(`${API_BASE_URL}/send-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        customerEmail: booking.customerEmail || '',
        tripType: booking.tripType,
        from: booking.from,
        to: booking.to,
        date: booking.date,
        time: booking.time,
        passengers: booking.passengers,
        vehicleType: booking.vehicleType || 'SEDAN',
        tripDistance: booking.tripDistance,
        tripDuration: booking.tripDuration,
        fareEstimate: booking.fareEstimate,
        perKmRate: 18,
        driverAllowance: 400,
        status: 'CONFIRMED'
      })
    });

    console.log('📧 Backend response status:', response.status);
    
    const result = await response.json();
    console.log('📧 Backend response:', result);
    
    if (result.success) {
      console.log('✅ Booking confirmation email sent successfully via backend');
      return true;
    } else {
      console.error('❌ Backend confirmation email sending failed:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending booking confirmation email via backend:', error);
    return false;
  }
};

// Send contact form email via backend
export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> => {
  try {
    console.log('📧 Sending contact email via backend...');
    
    const response = await fetch(`${API_BASE_URL}/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    console.log('📧 Backend response status:', response.status);
    
    const result = await response.json();
    console.log('📧 Backend response:', result);
    
    if (result.success) {
      console.log('✅ Contact email sent successfully via backend');
      return true;
    } else {
      console.error('❌ Backend contact email sending failed:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending contact email via backend:', error);
    return false;
  }
};

// Format booking enquiry for WhatsApp message
export const formatWhatsAppEnquiryMessage = (booking: BookingEnquiry): string => {
  const message = `🚖 *NEW BOOKING ENQUIRY - 1waytaxi*

📋 *Trip Details:*
• Booking ID: ${booking.bookingId}
• Trip Type: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
• From: ${booking.from}
• To: ${booking.to}
• Date: ${booking.date}
• Time: ${booking.time}
• Passengers: ${booking.passengers}
• Distance: ${booking.tripDistance}
• Duration: ${booking.tripDuration}

💰 *Fare Estimate:*
• Total Fare: ₹${booking.fareEstimate}
• Rate: ₹18/km + ₹400 driver allowance

👤 *Customer Info:*
• Name: ${booking.customerName}
• Phone: ${booking.customerPhone}
${booking.customerEmail ? `• Email: ${booking.customerEmail}` : ''}

⏳ *STATUS: ENQUIRY RECEIVED*
Customer is reviewing the fare estimate. Please standby for confirmation.

⏰ *Enquiry Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return encodeURIComponent(message);
};

// Format booking confirmation for WhatsApp message
export const formatWhatsAppConfirmationMessage = (booking: BookingEnquiry): string => {
  const message = `🚖 *BOOKING CONFIRMED - 1waytaxi*

📋 *Trip Details:*
• Booking ID: ${booking.bookingId}
• Trip Type: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
• From: ${booking.from}
• To: ${booking.to}
• Date: ${booking.date}
• Time: ${booking.time}
• Passengers: ${booking.passengers}
• Distance: ${booking.tripDistance}
• Duration: ${booking.tripDuration}

💰 *Fare Details:*
• Total Fare: ₹${booking.fareEstimate}
• Rate: ₹18/km + ₹400 driver allowance

👤 *Customer Info:*
• Name: ${booking.customerName}
• Phone: ${booking.customerPhone}
${booking.customerEmail ? `• Email: ${booking.customerEmail}` : ''}

✅ *STATUS: CONFIRMED BOOKING*
Please arrange vehicle and contact customer immediately.

⏰ *Confirmed Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return encodeURIComponent(message);
};

// Send WhatsApp enquiry notification
export const sendWhatsAppEnquiryNotification = (booking: BookingEnquiry): void => {
  const message = formatWhatsAppEnquiryMessage(booking);
  const whatsappUrl = `https://wa.me/917810095200?text=${message}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

// Send WhatsApp confirmation notification
export const sendWhatsAppConfirmationNotification = (booking: BookingEnquiry): void => {
  const message = formatWhatsAppConfirmationMessage(booking);
  const whatsappUrl = `https://wa.me/917810095200?text=${message}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

// Send enquiry notifications (email via backend + WhatsApp)
export const sendBookingEnquiryNotifications = async (booking: BookingEnquiry): Promise<void> => {
  console.log('📧 Sending booking enquiry notifications...');
  console.log('📋 Booking data:', booking);
  
  // Send enquiry email via backend
  const emailSent = await sendBookingEnquiryEmail(booking);
  
  // Send WhatsApp enquiry notification
  sendWhatsAppEnquiryNotification(booking);
  
  // Show status to user
  if (emailSent) {
    console.log('✅ All enquiry notifications sent successfully');
  } else {
    console.log('⚠️ Enquiry email failed, but WhatsApp notification sent');
  }
};

// Send confirmation notifications (email via backend + WhatsApp)
export const sendBookingConfirmationNotifications = async (booking: BookingEnquiry): Promise<void> => {
  console.log('📧 Sending booking confirmation notifications...');
  console.log('📋 Booking data:', booking);
  
  // Send confirmation email via backend
  const emailSent = await sendBookingConfirmationEmail(booking);
  
  // Send WhatsApp confirmation notification
  sendWhatsAppConfirmationNotification(booking);
  
  // Show status to user
  if (emailSent) {
    console.log('✅ All confirmation notifications sent successfully');
  } else {
    console.log('⚠️ Confirmation email failed, but WhatsApp notification sent');
  }
};

// Show success message to customer
export const showBookingConfirmation = (booking: BookingEnquiry): void => {
  const bookingId = booking.bookingId || generateBookingId();
  
  alert(`🚖 Ride Booked Successfully

Thanks for Choosing 1waytaxi, reservation details have been sent to your email id & phone.

Booking ID: ${bookingId}
${booking.fareEstimate ? `Total Fare: ₹${booking.fareEstimate}` : 'Fare will be calculated based on actual distance'}

Our team will contact you shortly at ${booking.customerPhone} to confirm your booking details.

Trip: ${booking.tripType === 'oneway' ? 'One Way' : 'Round Trip'}
From: ${booking.from}
To: ${booking.to}
Date: ${booking.date} at ${booking.time}

For any queries, call: +91 78100 95200

Thank you for choosing 1waytaxi!`);
};