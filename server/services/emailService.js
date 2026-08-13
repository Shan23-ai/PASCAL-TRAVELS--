/**
 * Email Service for Pascal Travels & Tours
 * Handles sending emails via Nodemailer (uses Gmail or SMTP)
 */

'use strict';

const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER || 'Pascaltravelsdoc@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT || 587;
const FROM_EMAIL = process.env.FROM_EMAIL || EMAIL_USER;

let transporter = null;

/**
 * Initialize email transporter
 */
function initTransporter() {
  if (transporter) return transporter;

  if (!EMAIL_PASSWORD) {
    console.warn('[EmailService] EMAIL_PASSWORD not set - email sending disabled');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });

  return transporter;
}

/**
 * Send welcome email to applicant
 */
async function sendApplicationConfirmation(email, fullName, packageName) {
  const tr = initTransporter();
  if (!tr) {
    console.log('[EmailService] Transporter not initialized, skipping email');
    return { success: false, message: 'Email service not configured' };
  }

  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: '✅ Application Received - Pascal Travels & Tours',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FFD700, #87CEEB); padding: 2rem; border-radius: 8px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome, ${fullName}!</h1>
        </div>
        
        <div style="padding: 2rem; background: #f5f5f5; margin-top: 1rem; border-radius: 8px;">
          <p>Your application for <strong>${packageName}</strong> has been successfully received.</p>
          
          <p>Our team will review your application and contact you within 48 hours. In the meantime, make sure to:</p>
          <ul>
            <li>Keep all your documents ready</li>
            <li>Verify your contact information is correct</li>
            <li>Check your email regularly for updates</li>
          </ul>
          
          <p><strong>Reference ID:</strong> ${Math.random().toString(36).substring(2, 11).toUpperCase()}</p>
          
          <div style="background: white; padding: 1rem; border-left: 4px solid #FFD700; margin-top: 1.5rem;">
            <p><strong>Questions?</strong></p>
            <p>Contact us at: <a href="mailto:Pascaltravelsdoc@gmail.com">Pascaltravelsdoc@gmail.com</a></p>
            <p>Phone: <a href="tel:+254">+254 ...</a></p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem; color: #999; font-size: 0.9rem;">
          <p>© 2024 Pascal Travels & Tours. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await tr.sendMail(mailOptions);
    console.log('[EmailService] Application confirmation sent to:', email);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('[EmailService] Error sending email:', error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Send visa application confirmation
 */
async function sendVisaApplicationConfirmation(email, fullName, visaType) {
  const tr = initTransporter();
  if (!tr) return { success: false, message: 'Email service not configured' };

  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: '📝 Visa Application Submitted - Pascal Travels & Tours',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #87CEEB, #FFD700); padding: 2rem; border-radius: 8px; text-align: center;">
          <h1 style="color: white; margin: 0;">Visa Application Submitted!</h1>
        </div>
        
        <div style="padding: 2rem; background: #f5f5f5; margin-top: 1rem; border-radius: 8px;">
          <p>Hello ${fullName},</p>
          
          <p>Your <strong>${visaType}</strong> visa application has been submitted successfully. Our team is now reviewing your documents.</p>
          
          <p><strong>What happens next?</strong></p>
          <ol>
            <li>We'll verify all your documents (2-3 business days)</li>
            <li>We'll contact you for any additional information if needed</li>
            <li>We'll submit your application to the embassy</li>
            <li>You'll receive regular updates on your application status</li>
          </ol>
          
          <div style="background: white; padding: 1rem; border-left: 4px solid #87CEEB; margin-top: 1.5rem;">
            <p><strong>Tracking Your Application:</strong></p>
            <p>Check the status anytime by visiting our website: <a href="https://pascaltravels.com/track">Track Your Visa</a></p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem; color: #999; font-size: 0.9rem;">
          <p>© 2024 Pascal Travels & Tours. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await tr.sendMail(mailOptions);
    console.log('[EmailService] Visa confirmation sent to:', email);
    return { success: true, message: 'Visa confirmation email sent' };
  } catch (error) {
    console.error('[EmailService] Error sending visa email:', error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Send agent approval/denial notification
 */
async function sendAgentNotification(agentEmail, agentName, actionType, candidateName, details) {
  const tr = initTransporter();
  if (!tr) return { success: false, message: 'Email service not configured' };

  const subject = actionType === 'approved' 
    ? `✅ Candidate Approved: ${candidateName}`
    : `❌ Candidate Application Update: ${candidateName}`;

  const statusColor = actionType === 'approved' ? '#10B981' : '#EF4444';
  const statusText = actionType === 'approved' ? 'APPROVED' : 'DENIED';

  const mailOptions = {
    from: FROM_EMAIL,
    to: agentEmail,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: ${statusColor}; padding: 2rem; border-radius: 8px; text-align: center;">
          <h1 style="color: white; margin: 0;">${statusText}</h1>
          <p style="color: white; margin: 0.5rem 0 0 0;">${candidateName}</p>
        </div>
        
        <div style="padding: 2rem; background: #f5f5f5; margin-top: 1rem; border-radius: 8px;">
          <p>Dear ${agentName},</p>
          
          <p>The following candidate has been <strong>${statusText.toLowerCase()}</strong>:</p>
          
          <div style="background: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <p><strong>Candidate Name:</strong> ${candidateName}</p>
            <p><strong>Status:</strong> ${statusText}</p>
            <p><strong>Details:</strong> ${details || 'No additional details provided'}</p>
          </div>
          
          <p>Please log in to your agent dashboard for more information and to take next steps.</p>
        </div>
        
        <div style="text-align: center; margin-top: 2rem; color: #999; font-size: 0.9rem;">
          <p>© 2024 Pascal Travels & Tours. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await tr.sendMail(mailOptions);
    console.log('[EmailService] Agent notification sent to:', agentEmail);
    return { success: true, message: 'Agent notification sent' };
  } catch (error) {
    console.error('[EmailService] Error sending agent email:', error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Send referral invitation email
 */
async function sendReferralInvitation(email, referrerName, referralCode, shareLink) {
  const tr = initTransporter();
  if (!tr) return { success: false, message: 'Email service not configured' };

  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: `🎯 Join Pascal Travels & Tours - Exciting Opportunities!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FFD700, #E53E3E); padding: 2rem; border-radius: 8px; text-align: center;">
          <h1 style="color: white; margin: 0;">Exciting Opportunities Await!</h1>
        </div>
        
        <div style="padding: 2rem; background: #f5f5f5; margin-top: 1rem; border-radius: 8px;">
          <p>Hello,</p>
          
          <p><strong>${referrerName}</strong> has referred you to Pascal Travels & Tours for an amazing job opportunity!</p>
          
          <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
            <p style="margin: 0; color: #999;">Referral Code:</p>
            <h2 style="margin: 0.5rem 0; color: #FFD700; font-size: 1.5rem;">${referralCode}</h2>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #999;">Use this code when applying for benefits</p>
          </div>
          
          <p><a href="${shareLink}" style="display: inline-block; background: #FFD700; color: #1E3A5F; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: bold;">View Job Opportunities →</a></p>
          
          <p>As a referred candidate, you'll get:</p>
          <ul>
            <li>✅ Fast-track review of your application</li>
            <li>✅ Priority consideration for positions</li>
            <li>✅ Exclusive referral bonuses</li>
            <li>✅ Dedicated support throughout the process</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 2rem; color: #999; font-size: 0.9rem;">
          <p>© 2024 Pascal Travels & Tours. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await tr.sendMail(mailOptions);
    console.log('[EmailService] Referral invitation sent to:', email);
    return { success: true, message: 'Referral invitation sent' };
  } catch (error) {
    console.error('[EmailService] Error sending referral email:', error.message);
    return { success: false, message: error.message };
  }
}

module.exports = {
  initTransporter,
  sendApplicationConfirmation,
  sendVisaApplicationConfirmation,
  sendAgentNotification,
  sendReferralInvitation
};
