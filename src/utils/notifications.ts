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
  vehicleRate?: number;
  driverAllowance?: number;
}

// Send booking enquiry email via backend
export const sendBookingEnquiryEmail = async (booking: BookingEnquiry): Promise<boolean> => {
  try {
    console.log('📧 Sending booking enquiry email via backend...', {
      bookingId: booking.bookingId,
      customerName: booking.customerName,
      from: booking.from,
      to: booking.to
    });
    
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
        perKmRate: booking.vehicleRate || 14,
        driverAllowance: booking.driverAllowance || 400,
        status: 'ENQUIRY'
      })
    });

    console.log('📧 Backend response status:', response.status);
    
    const result = await response.json();
    console.log('📧 Backend response:', result);
    
    if (result.success) {
      console.log('✅ Booking enquiry email sent successfully via backend');
      console.log('📧 Email sent to: 1waytaxi.booking@gmail.com');
      console.log('📧 Message ID:', result.messageId);
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
    console.log('📧 Sending booking confirmation email via backend...', {
      bookingId: booking.bookingId,
      customerName: booking.customerName,
      from: booking.from,
      to: booking.to
    });
    
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
        perKmRate: booking.vehicleRate || 14,
        driverAllowance: booking.driverAllowance || 400,
        status: 'CONFIRMED'
      })
    });

    console.log('📧 Backend response status:', response.status);
    
    const result = await response.json();
    console.log('📧 Backend response:', result);
    
    if (result.success) {
      console.log('✅ Booking confirmation email sent successfully via backend');
      console.log('📧 Email sent to: 1waytaxi.booking@gmail.com');
      console.log('📧 Message ID:', result.messageId);
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
  const message = `🚖 *BOOKING ENQUIRY - 1waytaxi*

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
• Rate: ₹${booking.vehicleRate}/km + ₹${booking.driverAllowance} driver allowance
• Vehicle: ${booking.vehicleType}

👤 *Customer Info:*
• Name: ${booking.customerName}
• Phone: ${booking.customerPhone}
${booking.customerEmail ? `• Email: ${booking.customerEmail}` : ''}

Thanks for booking 1waytaxi

⏰ *Enquiry Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

📞 *Contact:* +91 7810095200`;

  return encodeURIComponent(message);
};

// Format customer enquiry WhatsApp message
export const formatCustomerWhatsAppEnquiryMessage = (booking: BookingEnquiry): string => {
  const message = `🚖 *Thank you for your enquiry - 1waytaxi*

Dear ${booking.customerName}, 

We have received your booking enquiry! 📋

*Your Trip Details:*
• Booking ID: ${booking.bookingId}
• From: ${booking.from}
• To: ${booking.to}
• Date: ${booking.date}
• Time: ${booking.time}
• Vehicle: ${booking.vehicleType}
• Passengers: ${booking.passengers}

💰 *Fare Estimate: ₹${booking.fareEstimate}*
• Distance: ${booking.tripDistance}
• Duration: ${booking.tripDuration}
• Rate: ₹${booking.vehicleRate}/km + ₹${booking.driverAllowance} driver allowance

✅ *Next Steps:*
Our team will contact you shortly to confirm your booking and provide driver details.

📞 *Contact Us:*
• Phone: +91 7810095200
• Email: 1waytaxi.booking@gmail.com
• Website: www.1waytaxi.com

Thank you for choosing 1waytaxi! 🙏

⏰ *Enquiry Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return encodeURIComponent(message);
};

// Format customer confirmation WhatsApp message
export const formatCustomerWhatsAppConfirmationMessage = (booking: BookingEnquiry): string => {
  const message = `🚖 *BOOKING CONFIRMED - 1waytaxi*

Dear ${booking.customerName},

Your booking has been confirmed! ✅

*Confirmed Trip Details:*
• Booking ID: ${booking.bookingId}
• From: ${booking.from}
• To: ${booking.to}
• Date: ${booking.date}
• Time: ${booking.time}
• Vehicle: ${booking.vehicleType}
• Passengers: ${booking.passengers}

💰 *Total Fare: ₹${booking.fareEstimate}*
• Distance: ${booking.tripDistance}
• Duration: ${booking.tripDuration}

🚗 *What's Next:*
• Our driver will contact you 15-30 minutes before pickup
• Driver details will be shared via SMS/WhatsApp
• Please be ready at the pickup location on time

📞 *24/7 Support:*
• Phone: +91 7810095200
• WhatsApp: +91 7810095200
• Email: 1waytaxi.booking@gmail.com

Thank you for choosing 1waytaxi! 🙏
Safe travels!

⏰ *Confirmed Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return encodeURIComponent(message);
};
// Format booking confirmation for WhatsApp message
export const formatWhatsAppConfirmationMessage = (booking: BookingEnquiry): string => {
  const message = `🚖 *BOOKING CONFIRMATION - 1waytaxi*

Thanks for booking 1waytaxi! 🙏

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
• Rate: ₹${booking.vehicleRate}/km + ₹${booking.driverAllowance} driver allowance
• Vehicle: ${booking.vehicleType}

👤 *Customer Info:*
• Name: ${booking.customerName}
• Phone: ${booking.customerPhone}
${booking.customerEmail ? `• Email: ${booking.customerEmail}` : ''}

📞 *Contact:* +91 7810095200
🌐 *Website:* www.1waytaxi.com

⏰ *Confirmed Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return encodeURIComponent(message);
};

// Send WhatsApp enquiry notification
export const sendWhatsAppEnquiryNotification = async (booking: BookingEnquiry): Promise<void> => {
  const message = formatWhatsAppEnquiryMessage(booking);
  const whatsappUrl = `https://wa.me/917810095200?text=${message}`;
  
  console.log('📱 Sending WhatsApp enquiry notification...');
  console.log('📱 WhatsApp URL prepared for 1waytaxi team');
  
  // Open WhatsApp to send enquiry notification to 1waytaxi team
  try {
    // Open WhatsApp in new tab to send enquiry to 1waytaxi team
    window.open(whatsappUrl, '_blank');
    console.log('✅ WhatsApp enquiry notification opened for +91 7810095200');
  } catch (error) {
    console.error('❌ Error sending WhatsApp enquiry notification:', error);
  }
};

// Send WhatsApp enquiry notification to customer
export const sendCustomerWhatsAppEnquiryNotification = async (booking: BookingEnquiry): Promise<void> => {
  if (!booking.customerPhone) {
    console.log('⚠️ No customer phone number provided for WhatsApp notification');
    return;
  }

  const message = formatCustomerWhatsAppEnquiryMessage(booking);
  const customerPhone = booking.customerPhone.replace(/\D/g, ''); // Remove non-digits
  const formattedPhone = customerPhone.startsWith('91') ? customerPhone : `91${customerPhone}`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${message}`;
  
  console.log('📱 Sending WhatsApp enquiry notification to customer...');
  console.log('📱 Customer phone:', formattedPhone);
  
  try {
    // Open WhatsApp to send enquiry confirmation to customer
    window.open(whatsappUrl, '_blank');
    console.log('✅ WhatsApp enquiry notification opened for customer:', formattedPhone);
  } catch (error) {
    console.error('❌ Error sending customer WhatsApp enquiry notification:', error);
  }
};
// Send WhatsApp confirmation notification
export const sendWhatsAppConfirmationNotification = async (booking: BookingEnquiry): Promise<void> => {
  const message = formatWhatsAppConfirmationMessage(booking);
  const whatsappUrl = `https://wa.me/917810095200?text=${message}`;
  
  console.log('📱 Sending WhatsApp confirmation notification...');
  console.log('📱 WhatsApp URL prepared for 1waytaxi team');
  
  // Open WhatsApp to send confirmation notification to 1waytaxi team
  try {
    // Open WhatsApp in new tab to send confirmation to 1waytaxi team
    window.open(whatsappUrl, '_blank');
    console.log('✅ WhatsApp confirmation notification opened for +91 7810095200');
  } catch (error) {
    console.error('❌ Error sending WhatsApp confirmation notification:', error);
  }
};

// Send WhatsApp confirmation notification to customer
export const sendCustomerWhatsAppConfirmationNotification = async (booking: BookingEnquiry): Promise<void> => {
  if (!booking.customerPhone) {
    console.log('⚠️ No customer phone number provided for WhatsApp notification');
    return;
  }

  const message = formatCustomerWhatsAppConfirmationMessage(booking);
  const customerPhone = booking.customerPhone.replace(/\D/g, ''); // Remove non-digits
  const formattedPhone = customerPhone.startsWith('91') ? customerPhone : `91${customerPhone}`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${message}`;
  
  console.log('📱 Sending WhatsApp confirmation notification to customer...');
  console.log('📱 Customer phone:', formattedPhone);
  
  try {
    // Open WhatsApp to send confirmation to customer
    window.open(whatsappUrl, '_blank');
    console.log('✅ WhatsApp confirmation notification opened for customer:', formattedPhone);
  } catch (error) {
    console.error('❌ Error sending customer WhatsApp confirmation notification:', error);
  }
};
// Send enquiry notifications (email via backend + WhatsApp)
export const sendBookingEnquiryNotifications = async (booking: BookingEnquiry): Promise<void> => {
  console.log('📧 Starting booking enquiry notifications...', {
    bookingId: booking.bookingId,
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    tripType: booking.tripType,
    from: booking.from,
    to: booking.to,
    fareEstimate: booking.fareEstimate
  });
  
  try {
    // Send enquiry email via backend
    console.log('📧 Sending enquiry email...');
    const emailSent = await sendBookingEnquiryEmail(booking);
    
    if (emailSent) {
      console.log('✅ Enquiry email sent successfully');
     console.log('📧 1waytaxi team notified via email at: 1waytaxi.booking@gmail.com');
    } else {
      console.log('⚠️ Enquiry email failed');
    }
    
    // Send WhatsApp enquiry notification
    console.log('📱 Sending WhatsApp enquiry notification...');
    await sendWhatsAppEnquiryNotification(booking);
    
    // Send WhatsApp enquiry notification to customer
    console.log('📱 Sending WhatsApp enquiry notification to customer...');
    await sendCustomerWhatsAppEnquiryNotification(booking);
    
    // Show status to user
    if (emailSent) {
      console.log('✅ All enquiry notifications sent successfully');
     console.log('📧 Customer will receive email confirmation if provided');
    } else {
      console.log('⚠️ Enquiry email failed, but WhatsApp notification sent');
    }
  } catch (error) {
    console.error('❌ Error in enquiry notifications:', error);
    // Still send WhatsApp even if email fails
    await sendWhatsAppEnquiryNotification(booking);
    await sendCustomerWhatsAppEnquiryNotification(booking);
  }
};

// Send confirmation notifications (email via backend + WhatsApp)
export const sendBookingConfirmationNotifications = async (booking: BookingEnquiry): Promise<void> => {
  console.log('📧 Starting booking confirmation notifications...', {
    bookingId: booking.bookingId,
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    tripType: booking.tripType,
    from: booking.from,
    to: booking.to,
    fareEstimate: booking.fareEstimate
  });
  
  try {
    // Send confirmation email via backend
    console.log('📧 Sending confirmation email...');
    const emailSent = await sendBookingConfirmationEmail(booking);
    
    if (emailSent) {
      console.log('✅ Confirmation email sent successfully');
     console.log('📧 1waytaxi team notified via email at: 1waytaxi.booking@gmail.com');
    } else {
      console.log('⚠️ Confirmation email failed');
    }
    
    // Send WhatsApp confirmation notification
    console.log('📱 Sending WhatsApp confirmation notification...');
    await sendWhatsAppConfirmationNotification(booking);
    
    // Send WhatsApp confirmation notification to customer
    console.log('📱 Sending WhatsApp confirmation notification to customer...');
    await sendCustomerWhatsAppConfirmationNotification(booking);
    
    // Show status to user
    if (emailSent) {
      console.log('✅ All confirmation notifications sent successfully');
     console.log('📧 Customer will receive email confirmation if provided');
    } else {
      console.log('⚠️ Confirmation email failed, but WhatsApp notification sent');
    }
  } catch (error) {
    console.error('❌ Error in confirmation notifications:', error);
    // Still send WhatsApp even if email fails
    await sendWhatsAppConfirmationNotification(booking);
    await sendCustomerWhatsAppConfirmationNotification(booking);
  }

}