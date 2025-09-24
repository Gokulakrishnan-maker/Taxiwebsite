const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

console.log('🚀 Starting 1waytaxi Email Server...');
console.log('📧 Email User:', process.env.EMAIL_USER || 'NOT SET');
console.log('🔑 Email Pass:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');

// Create nodemailer transporter
const createTransporter = () => {
  // Primary configuration (port 587)
  const primaryConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000,   // 30 seconds
    socketTimeout: 30000,     // 30 seconds
    pool: false,              // Disable connection pooling
    debug: false,
    logger: false
  };

  // Fallback configuration (port 465)
  const fallbackConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    pool: false,
    debug: false,
    logger: false
  };

  return { primary: nodemailer.createTransport(primaryConfig), fallback: nodemailer.createTransport(fallbackConfig) };
};

const { primary: transporter, fallback: fallbackTransporter } = createTransporter();

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    console.log('🔧 Verifying email configuration...');
    console.log('📧 Email User:', process.env.EMAIL_USER || 'NOT SET');
    console.log('🔑 Email Pass:', process.env.EMAIL_PASS ? `SET (${process.env.EMAIL_PASS.length} chars)` : 'NOT SET');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('❌ Email credentials not configured in .env file');
      return false;
    }

    console.log('🔌 Testing primary SMTP connection (port 587)...');
    try {
      const result = await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Primary connection timeout after 10 seconds')), 10000)
        )
      ]);
      
      console.log('✅ Primary email server is ready to send messages');
      console.log('📧 Using port 587 (STARTTLS)');
      return true;
    } catch (primaryError) {
      console.log('⚠️ Primary connection failed:', primaryError.message);
      console.log('🔄 Trying fallback connection (port 465)...');
      
      try {
        const fallbackResult = await Promise.race([
          fallbackTransporter.verify(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Fallback connection timeout after 30 seconds')), 30000)
          )
        ]);
        
        console.log('✅ Fallback email server is ready to send messages');
        console.log('📧 Using port 465 (SSL/TLS)');
        return true;
      } catch (fallbackError) {
        console.log('❌ Both connections failed');
        throw fallbackError;
      }
    }
    
  } catch (error) {
    console.log('❌ Email configuration error:', error.message);
    
    if (error.message.includes('timeout') || error.message.includes('Timeout')) {
      console.log('');
      console.log('🔧 TIMEOUT ERROR - Troubleshooting steps:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify Gmail credentials are correct');
      console.log('   3. Ensure EMAIL_PASS is App Password (16 chars, no spaces)');
      console.log('   4. Check if firewall is blocking port 587');
      console.log('   5. Try using different network connection');
      console.log('   6. Check if your ISP blocks SMTP ports');
      console.log('');
    }
    
    console.log('');
    console.log('🔧 Troubleshooting steps:');
    console.log('   1. Check your Gmail credentials in .env file');
    console.log('   2. Ensure 2-Factor Authentication is enabled on Gmail');
    console.log('   3. Generate App Password (not regular password)');
    console.log('   4. App Password should be 16 characters without spaces');
    console.log('   5. Try restarting the server after changes');
    console.log('   6. Check network connectivity and firewall settings');
    console.log('📧 Current EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
    console.log('🔑 Current EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'NOT SET');
    return false;
  }
};

// Helper function to send email with fallback
const sendEmailWithFallback = async (mailOptions) => {
  try {
    console.log('📤 Attempting to send email via primary connection...');
    return await transporter.sendMail(mailOptions);
  } catch (primaryError) {
    console.log('⚠️ Primary email failed, trying fallback...');
    console.log('🔄 Using fallback connection (port 465)...');
    return await fallbackTransporter.sendMail(mailOptions);
  }
};

// Verify email configuration with retry
let emailConfigured = false;
verifyEmailConfig().then(success => {
  emailConfigured = success;
}).catch(() => {
  emailConfigured = false;
});

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    if (!emailConfigured) {
      return res.status(500).json({
        success: false,
        message: 'Email not configured properly. Check server logs.',
        configured: false
      });
    }

    console.log('🧪 Testing email configuration...');
    
    const testMailOptions = {
      from: `1waytaxi System <${process.env.EMAIL_USER}>`,
      to: '1waytaxi.booking@gmail.com',
      subject: 'Test Email - 1waytaxi System',
      text: 'This is a test email to verify the email system is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #1e40af;">🚖 1waytaxi Email Test</h2>
          <p>This is a test email to verify the email system is working correctly.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <p style="color: #10b981;"><strong>✅ Email system is functioning properly!</strong></p>
        </div>
      `
    };

    const info = await sendEmailWithFallback(testMailOptions);
    console.log('✅ Test email sent successfully:', info.messageId);
    
    res.status(200).send(`
      <html>
        <head>
          <title>1waytaxi Email Test</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .success { background: #d1fae5; border: 2px solid #10b981; padding: 20px; border-radius: 10px; }
            .error { background: #fee2e2; border: 2px solid #ef4444; padding: 20px; border-radius: 10px; }
            .info { background: #dbeafe; border: 2px solid #3b82f6; padding: 20px; border-radius: 10px; margin: 20px 0; }
            h1 { color: #1e40af; }
            .back-btn { background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>🚖 1waytaxi Email Test</h1>
          <div class="success">
            <h2>✅ Test Email Sent Successfully!</h2>
            <p><strong>Message ID:</strong> ${info.messageId}</p>
            <p><strong>Response:</strong> ${info.response}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
          <div class="info">
            <h3>📧 Email Details:</h3>
            <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
            <p><strong>To:</strong> 1waytaxi.booking@gmail.com</p>
            <p><strong>Subject:</strong> Test Email - 1waytaxi System</p>
          </div>
          <a href="/" class="back-btn">← Back to Website</a>
        </body>
      </html>
    `);

  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).send(`
      <html>
        <head>
          <title>1waytaxi Email Test - Error</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .error { background: #fee2e2; border: 2px solid #ef4444; padding: 20px; border-radius: 10px; }
            .info { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 10px; margin: 20px 0; }
            h1 { color: #dc2626; }
            .back-btn { background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
            code { background: #f3f4f6; padding: 2px 4px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <h1>❌ Email Test Failed</h1>
          <div class="error">
            <h2>Email Configuration Error</h2>
            <p><strong>Error:</strong> ${error.message}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
          <div class="info">
            <h3>🔧 Troubleshooting Steps:</h3>
            <ol>
              <li>Check your Gmail credentials in <code>.env</code> file</li>
              <li>Ensure 2-Factor Authentication is enabled on Gmail</li>
              <li>Generate App Password (not regular password)</li>
              <li>App Password should be 16 characters without spaces</li>
              <li>Restart the server after making changes</li>
            </ol>
            <h4>Current Configuration:</h4>
            <p><strong>EMAIL_USER:</strong> ${process.env.EMAIL_USER || 'NOT SET'}</p>
            <p><strong>EMAIL_PASS:</strong> ${process.env.EMAIL_PASS ? 'SET (' + process.env.EMAIL_PASS.length + ' chars)' : 'NOT SET'}</p>
          </div>
          <a href="/" class="back-btn">← Back to Website</a>
        </body>
      </html>
    `);
  }
});

// Booking email endpoint
app.post('/api/send-booking-email', async (req, res) => {
  try {
    if (!emailConfigured) {
      console.log('⚠️ Email not configured, skipping email send');
      return res.status(200).json({
        success: false,
        message: 'Email not configured, but request processed',
        emailSent: false
      });
    }

    console.log('📧 Received booking email request:', req.body);
    
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

    // Validate required fields
    if (!bookingId || !customerName || !customerPhone || !from || !to) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information'
      });
    }

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
    const emailSubject = `${statusText} - 1waytaxi - ID: ${bookingId} - ${customerName}`;
    
    const emailBody = `${statusText} - 1waytaxi Website

Booking ID: ${bookingId}
Customer: ${customerName} (${customerPhone})

CUSTOMER DETAILS:
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail || 'Not Provided'}

TRIP DETAILS:
From: ${from}
To: ${to}
Date & Time: ${date} ${time}
Trip Type: ${tripType === 'oneway' ? 'One Way' : 'Round Trip'}
Vehicle: ${vehicleType}
Passengers: ${passengers}
Distance: ${tripDistance}
Duration: ${tripDuration}

FARE DETAILS:
Rate per KM: ₹${perKmRate}
Driver Allowance: ₹${driverAllowance}
Total Fare: ₹${fareEstimate}
Additional: Toll charges extra
Booking Time: ${currentDateTime}
Contact: +91 74183 32789`;

    const mailOptions = {
      from: `1waytaxi Booking <${process.env.EMAIL_USER}>`,
      to: '1waytaxi.booking@gmail.com',
      subject: emailSubject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: ${isEnquiry ? '#f59e0b' : '#10b981'}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🚖 ${statusText}</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">1waytaxi Website Booking</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="background-color: ${isEnquiry ? '#fbbf24' : '#34d399'}; color: white; padding: 15px; border-radius: 6px; text-align: center; margin-bottom: 25px;">
              <h2 style="margin: 0; font-size: 18px;">Booking ID: ${bookingId}</h2>
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
                <tr><td style="padding: 8px 0; font-weight: bold;">Trip Type:</td><td style="padding: 8px 0;">${tripType === 'oneway' ? 'One Way' : 'Round Trip'}</td></tr>
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
                <tr><td style="padding: 8px 0; font-weight: bold;">Driver Allowance:</td><td style="padding: 8px 0;">₹${driverAllowance}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Toll Charges:</td><td style="padding: 8px 0;">EXTRA</td></tr>
                <tr style="border-top: 2px solid #e5e7eb;"><td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #10b981;">Total Fare:</td><td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #10b981;">₹${fareEstimate}</td></tr>
              </table>
            </div>

            <div style="background-color: ${isEnquiry ? '#fef3c7' : '#d1fae5'}; border: 1px solid ${isEnquiry ? '#f59e0b' : '#10b981'}; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 20px;">
              <h3 style="margin: 0 0 10px 0; color: ${isEnquiry ? '#92400e' : '#065f46'};">${isEnquiry ? '⏳ ENQUIRY STATUS' : '✅ CONFIRMED BOOKING'}</h3>
              <p style="margin: 0; color: ${isEnquiry ? '#92400e' : '#065f46'};">${isEnquiry ? 'Customer is reviewing fare estimate. Please standby for confirmation.' : 'Customer has confirmed the booking. Please arrange vehicle and contact customer immediately.'}</p>
            </div>

            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p>Booking Time: ${currentDateTime}</p>
              <p>Contact: +91 7418332789</p>
              <p>www.1waytaxi.com</p>
            </div>
          </div>
        </div>
      `
    };

    console.log('📤 Sending email to:', mailOptions.to);
    console.log('📧 Email subject:', mailOptions.subject);

    const info = await sendEmailWithFallback(mailOptions);
    console.log(`✅ ${statusText} email sent successfully:`, info.messageId);
    console.log('📬 Email response:', info.response);

    res.status(200).json({
      success: true,
      message: `${statusText} email sent successfully`,
      messageId: info.messageId,
      response: info.response
    });

  } catch (error) {
    console.error('❌ Error sending booking email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send booking email',
      error: error.message,
      stack: error.stack
    });
  }
});

// Contact form endpoint
app.post('/api/send-contact-email', async (req, res) => {
  try {
    if (!emailConfigured) {
      console.log('⚠️ Email not configured, skipping email send');
      return res.status(200).json({
        success: false,
        message: 'Email not configured, but request processed',
        emailSent: false
      });
    }

    console.log('📧 Received contact form request:', req.body);
    
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required contact information'
      });
    }

    const currentDateTime = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata'
    });

    const emailSubject = `Contact Form Enquiry - ${name} - 1waytaxi`;
    
    const emailBody = `New Contact Form Enquiry - 1waytaxi

Customer Details:
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

Enquiry Time: ${currentDateTime}

Please respond to the customer promptly.

Contact: +91 74183 32789
www.1waytaxi.com`;

    const mailOptions = {
      from: `1waytaxi Contact <${process.env.EMAIL_USER}>`,
      to: '1waytaxi.booking@gmail.com',
      subject: emailSubject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">📞 Contact Form Enquiry</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">1waytaxi Website</p>
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

            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; text-align: center;">
              <p style="margin: 0; color: #92400e; font-weight: bold;">⚡ Please respond to the customer promptly</p>
            </div>

            <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px;">
              <p>Enquiry Time: ${currentDateTime}</p>
              <p>Contact: +91 7418332789</p>
              <p>www.1waytaxi.com</p>
            </div>
          </div>
        </div>
      `
    };

    console.log('📤 Sending contact email to:', mailOptions.to);

    const info = await sendEmailWithFallback(mailOptions);
    console.log('✅ Contact email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Contact form email sent successfully',
      messageId: info.messageId,
      response: info.response
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
    timestamp: new Date().toISOString(),
    emailConfigured: emailConfigured,
    emailUser: process.env.EMAIL_USER || 'NOT SET',
    emailPassLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
  });
});

// Simple test endpoint without email
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API server is working!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 1waytaxi Email Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test email: http://localhost:${PORT}/api/test-email`);
  console.log(`📧 Emails will be sent to: 1waytaxi.booking@gmail.com`);
});
