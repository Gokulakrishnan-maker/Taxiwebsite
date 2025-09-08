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
}

// Send booking confirmation email via backend
export const sendBookingEmail = async (booking: BookingEnquiry): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        customerEmail: '', // Can be added to form later
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
        driverAllowance: 400
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Booking email sent successfully via backend');
      return true;
    } else {
      console.error('❌ Backend email sending failed:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending booking email via backend:', error);
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
    const response = await fetch(`${API_BASE_URL}/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();
    
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

// Format booking details for WhatsApp message
export const formatWhatsAppMessage = (booking: BookingEnquiry): string => {
  const message = `🚖 *NEW BOOKING CONFIRMED - 1waytaxi*

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

✅ *STATUS: CONFIRMED BOOKING*
Please arrange vehicle and contact customer immediately.

⏰ *Confirmed Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return encodeURIComponent(message);
};

// Send WhatsApp notification
export const sendWhatsAppNotification = (booking: BookingEnquiry): void => {
  const message = formatWhatsAppMessage(booking);
  const whatsappUrl = `https://wa.me/917810095200?text=${message}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

// Send both notifications (email via backend + WhatsApp)
export const sendBookingNotifications = async (booking: BookingEnquiry): Promise<void> => {
  // Send email via backend
  const emailSent = await sendBookingEmail(booking);
  
  // Send WhatsApp notification as backup
  sendWhatsAppNotification(booking);
  
  // Show status to user
  if (emailSent) {
    console.log('✅ All notifications sent successfully');
  } else {
    console.log('⚠️ Email failed, but WhatsApp notification sent');
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