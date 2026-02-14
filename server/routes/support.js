const express = require('express');
const router = express.Router();
const Support = require('../models/Support');
const { Resend } = require('resend');

// Initialize Resend
let resend;
if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
} else {
    console.warn('RESEND_API_KEY is not defined in environment variables');
}

// Utility for sending email
const sendEmail = async (data) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('Skipping email notification: RESEND_API_KEY not configured in .env');
        return false;
    }

    try {
        const { error } = await resend.emails.send({
            from: 'Traver Support <onboarding@resend.dev>',
            to: 'shazzad920@gmail.com',
            subject: `New Support Message from ${data.firstName} ${data.lastName}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #1e293b; padding: 32px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">TRAVER</h1>
                        <p style="color: #94a3b8; margin-top: 8px; font-size: 14px; font-weight: 500;">Support Administration</p>
                    </div>
                    
                    <div style="padding: 40px;">
                        <div style="margin-bottom: 32px;">
                            <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-bottom: 12px;">New Inquiry Received</h2>
                            <p style="color: #475569; font-size: 16px; line-height: 1.6;">You have received a new message through the support contact form. Here are the details:</p>
                        </div>

                        <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; width: 35%;">Name</td>
                                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: 600;">${data.firstName} ${data.lastName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Email</td>
                                    <td style="padding: 8px 0; color: #f97316; font-size: 15px; font-weight: 600;">${data.email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Phone</td>
                                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: 600;">${data.phone || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Website</td>
                                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: 600;">${data.companyWebsite || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>

                        <div style="border-left: 4px solid #f97316; padding-left: 20px; margin-bottom: 32px;">
                            <h3 style="color: #0f172a; font-size: 15px; font-weight: 700; margin-bottom: 8px;">Message Content:</h3>
                            <p style="color: #334155; font-size: 15px; line-height: 1.7; font-style: italic;">"${data.message}"</p>
                        </div>

                        <div style="text-align: center;">
                            <a href="mailto:${data.email}" style="display: inline-block; background-color: #1e293b; color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; transition: background-color 0.2s;">Reply to Sender</a>
                        </div>
                    </div>

                    <div style="background-color: #f1f5f9; padding: 24px; text-align: center;">
                        <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; 2026 Traver. This is an automated notification from your landing page support system.</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Resend Error:', error);
            return false;
        }

        console.log('Email sent successfully via Resend');
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// @route   POST api/support
// @desc    Submit support message
// @access  Public
router.post('/', async (req, res) => {
    console.log('Received support request:', req.body);
    const { firstName, lastName, email, phone, companyWebsite, message } = req.body;

    let savedSupport = null;
    let dbError = null;

    try {
        const newSupport = new Support({
            firstName,
            lastName,
            email,
            phone,
            companyWebsite,
            message
        });
        savedSupport = await newSupport.save();
        console.log('Support message saved to DB');
    } catch (err) {
        console.error('Database Save Error:', err.message);
        dbError = err.message;
        // We continue anyway to try and send the email
    }

    // Always try to send email notification
    console.log('Attempting to send email...');
    const emailSent = await sendEmail({ firstName, lastName, email, phone, companyWebsite, message });

    if (emailSent || savedSupport) {
        res.status(201).json({
            success: true,
            message: emailSent ? 'Message sent and received!' : 'Message received (Email failed)',
            dbStatus: savedSupport ? 'Saved' : `Failed: ${dbError}`,
            emailStatus: emailSent ? 'Sent' : 'Failed'
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Both database save and email failed',
            error: dbError || 'Email failed'
        });
    }
});

module.exports = router;
