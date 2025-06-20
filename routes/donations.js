const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Handle donation submission
router.post('/', async (req, res) => {
  try {
    const { amount, fullName, email, paymentMethod } = req.body;

    // Validate input
    if (!amount || !fullName || !email || !paymentMethod) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database (in a real app, you'd use MongoDB/PostgreSQL etc.)
    // For now, we'll just log it and send an email
    
    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your donation to HOPE for EVERYCHILD',
      html: `
        <h1>Thank you, ${fullName}!</h1>
        <p>We've received your donation of MK${amount} via ${paymentMethod}.</p>
        <p>Your support helps provide education to children in Malawi.</p>
        <p>For payment instructions, please reply to this email.</p>
        <p>Blessings,</p>
        <p>The HOPE for EVERYCHILD Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Also send notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Donation: MK${amount} from ${fullName}`,
      text: `New donation received:\n\nAmount: MK${amount}\nName: ${fullName}\nEmail: ${email}\nMethod: ${paymentMethod}`
    };

    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ message: 'Donation received successfully!' });
  } catch (error) {
    console.error('Donation processing error:', error);
    res.status(500).json({ error: 'Error processing donation' });
  }
});

module.exports = router;