/**
 * Email API Routes
 * POST /api/emails/application-confirmation
 * POST /api/emails/visa-confirmation
 * POST /api/emails/agent-notification
 * POST /api/emails/referral-invitation
 */

'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const emailService = require('../services/emailService');

const router = express.Router();

/**
 * POST /api/emails/application-confirmation
 * Send application confirmation email
 */
router.post('/application-confirmation', async (req, res) => {
  try {
    const { email, fullName, packageName } = req.body;

    if (!email || !fullName || !packageName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, fullName, packageName'
      });
    }

    const result = await emailService.sendApplicationConfirmation(email, fullName, packageName);
    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('[Email API] Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/emails/visa-confirmation
 * Send visa application confirmation email
 */
router.post('/visa-confirmation', async (req, res) => {
  try {
    const { email, fullName, visaType } = req.body;

    if (!email || !fullName || !visaType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, fullName, visaType'
      });
    }

    const result = await emailService.sendVisaApplicationConfirmation(email, fullName, visaType);
    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('[Email API] Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/emails/agent-notification
 * Send agent approval/denial notification
 */
router.post('/agent-notification', async (req, res) => {
  try {
    const { agentEmail, agentName, actionType, candidateName, details } = req.body;

    if (!agentEmail || !agentName || !actionType || !candidateName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (!['approved', 'denied'].includes(actionType)) {
      return res.status(400).json({
        success: false,
        message: 'actionType must be "approved" or "denied"'
      });
    }

    const result = await emailService.sendAgentNotification(
      agentEmail,
      agentName,
      actionType,
      candidateName,
      details
    );
    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('[Email API] Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/emails/referral-invitation
 * Send referral invitation email
 */
router.post('/referral-invitation', async (req, res) => {
  try {
    const { email, referrerName, referralCode, shareLink } = req.body;

    if (!email || !referrerName || !referralCode) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, referrerName, referralCode'
      });
    }

    const result = await emailService.sendReferralInvitation(
      email,
      referrerName,
      referralCode,
      shareLink || `${process.env.FRONTEND_URL || 'http://localhost:8080'}/?ref=${referralCode}`
    );
    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('[Email API] Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
