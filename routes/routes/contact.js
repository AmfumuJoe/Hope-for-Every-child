const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Message from ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting HOPE for EVERYCHILD',
      html: `
        <h1>Thank you, ${name}!</h1>
        <p>We've received your message regarding "${subject}".</p>
        <p>Our team will get back to you soon.</p>
        <p>Blessings,</p>
        <p>The HOPE for EVERYCHILD Team</p>
      `
    };

    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

module.exports = router;