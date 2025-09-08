const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create nodemailer transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error.message);
    console.log('📧 Email User:', process.env.EMAIL_USER ? 'Set' : 'Not Set');
    console.log('🔑 Email Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log('📧 Using email:', process.env.EMAIL_USER);
  }
});

// Booking confirmation endpoint
app.post('/api/send-booking-email', async (req, res) => {
  try {
    const {
      bookingId,
      customerName,
      customerPhone,
      customerEmail,
      tripType,
      from,
      to,
      date,
      time,
      passengers,
      vehicleType,
      tripDistance,
      tripDuration,
      fareEstimate,
      perKmRate,
      driverAllowance,
      status = 'CONFIRMED'
    } = req.body;

    const currentDateTime = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const isEnquiry = status === 'ENQUIRY';
    const statusText = isEnquiry ? 'BOOKING ENQUIRY' : 'CONFIRMED BOOKING';
    const emailSubject = `${statusText} - Website Details - Booking ID: ${bookingId}`;
    
    const emailBody = `${statusText} - Website Details
Booking ID: ${bookingId}

Thanks for Choosing 1waytaxi

${statusText} DETAILS
Booking ID: ${bookingId}
Name: ${customerName}
Email ID: ${customerEmail || 'Not Provided'}
Phone: ${customerPhone}
Pickup Location: ${from}
Drop Location: ${to}
Vehicle Type: ${vehicleType}
Journey Type: ${tripType === 'oneway' ? 'One Way' : 'Round Trip'}
Travel Date & Time: ${date} ${time}
Passengers: ${passengers}
Trip Distance: ${tripDistance}
Trip Duration: ${tripDuration}
Rate per KM: ₹${perKmRate}
Driver Allowance: ₹${driverAllowance} (INCLUDED)
Toll: EXTRA
Total Trip Fare: ₹${fareEstimate} (Driver Allowance Included)

For Customer Intimation: Toll Gate, Permit, Hill Station Charges Extra

For Questions Contact: +91 78100 95200
www.1waytaxi.com

${statusText} TIME: ${currentDateTime}

STATUS: ${isEnquiry ? 'ENQUIRY - Customer is reviewing the fare estimation.' : 'CONFIRMED - Customer has accepted the fare estimation and confirmed the booking.'}

TOTAL: ₹${fareEstimate}

${isEnquiry ? 'ENQUIRY RECEIVED - Please standby for customer confirmation.' : 'BOOKING CONFIRMED - Please arrange the vehicle and contact customer at ' + customerPhone + ' for pickup coordination.'}`;

    // Email options
    const mailOptions = {
      from: `1waytaxi Booking System <${process.env.EMAIL_USER}>`,
      to: '1waytaxi.booking@gmail.com',
      subject: emailSubject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: ${isEnquiry ? '#f59e0b' : '#1e40af'}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🚖 ${statusText}</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Website Enquiry Details</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="background-color: ${isEnquiry ? '#f59e0b' : '#10b981'}; color: white; padding: 15px; border-radius: 6px; text-align: center; margin-bottom: 25px;">
              <h2 style="margin: 0; font-size: 18px;">Booking ID: ${bookingId}</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Thanks for Choosing 1waytaxi</p>
            </div>

            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">👤 Customer Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${customerName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${customerPhone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${customerEmail || 'Not Provided'}</td></tr>
              </table>
            </div>

            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">🚗 Trip Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">From:</td><td style="padding: 8px 0;">${from}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">To:</td><td style="padding: 8px 0;">${to}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Date & Time:</td><td style="padding: 8px 0;">${date} ${time}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Journey Type:</td><td style="padding: 8px 0;">${tripType === 'oneway' ? 'One Way' : 'Round Trip'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Vehicle:</td><td style="padding: 8px 0;">${vehicleType}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Passengers:</td><td style="padding: 8px 0;">${passengers}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Distance:</td><td style="padding: 8px 0;">${tripDistance}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Duration:</td><td style="padding: 8px 0;">${tripDuration}</td></tr>
              </table>
            </div>

            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">💰 Fare Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Rate per KM:</td><td style="padding: 8px 0;">₹${perKmRate}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Driver Allowance:</td><td style="padding: 8px 0;">₹${driverAllowance} (INCLUDED)</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Toll Charges:</td><td style="padding: 8px 0;">EXTRA</td></tr>
                <tr style="border-top: 2px solid #e5e7eb;"><td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #10b981;">Total Fare:</td><td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #10b981;">₹${fareEstimate}</td></tr>
              </table>
            </div>

            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin-bottom: 25px;">
              <p style="margin: 0; color: #92400e; font-weight: bold;">⚠️ Additional Charges:</p>
              <p style="margin: 5px 0 0 0; color: #92400e;">Toll Gate, Permit, Hill Station Charges Extra</p>
            </div>

            <div style="background-color: ${isEnquiry ? '#f59e0b' : '#10b981'}; color: white; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 20px;">
              <h3 style="margin: 0 0 10px 0;">${isEnquiry ? '⏳ STATUS: ENQUIRY' : '✅ STATUS: CONFIRMED'}</h3>
              <p style="margin: 0; opacity: 0.9;">${isEnquiry ? 'Customer is reviewing fare estimate. Please standby.' : 'Please arrange vehicle and contact customer immediately'}</p>
            </div>

            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p>${statusText} Time: ${currentDateTime}</p>
              <p>For Questions Contact: +91 78100 95200</p>
              <p>www.1waytaxi.com</p>
            </div>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ ${statusText} email sent successfully:`, info.messageId);

    res.status(200).json({
      success: true,
      message: `${statusText} email sent successfully`,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending booking email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send booking email',
      error: error.message
    });
  }
});

// Contact form endpoint
app.post('/api/send-contact-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const currentDateTime = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata'
    });

    const emailSubject = `New Contact Form Enquiry - ${name}`;
    
    const emailBody = `New Contact Form Enquiry

Customer Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Message:
${message}

Enquiry Time: ${currentDateTime}

Please respond to the customer as soon as possible.

Best regards,
1waytaxi Contact System`;

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: '1waytaxi.booking@gmail.com',
      subject: emailSubject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">📞 New Contact Enquiry</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">👤 Customer Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>
            </table>

            <h3 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">💬 Message</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
              <p style="margin: 0; line-height: 1.6;">${message}</p>
            </div>

            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p>Enquiry Time: ${currentDateTime}</p>
              <p style="color: #dc2626; font-weight: bold;">Please respond to the customer as soon as possible.</p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Contact form email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send contact form email',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '1waytaxi Email Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 1waytaxi Email Server running on port ${PORT}`);
  console.log(`📧 Email notifications will be sent to: ${process.env.EMAIL_TO}`);
});