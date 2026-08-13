/**
 * Authentication Routes
 * POST /api/auth/register - Register new user/agent
 * POST /api/auth/login - Login user/agent
 * POST /api/auth/verify - Verify token
 * POST /api/auth/refresh - Refresh token
 */

'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// In-memory user store (production uses database)
const users = new Map();

/**
 * POST /api/auth/register
 * Register new user or agent
 * Body: { email, password, fullName, agentName?, agentCompany?, role: 'user'|'agent' }
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, agentName, agentCompany, role = 'user' } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, password, fullName'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    const existingUser = Array.from(users.values()).find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    let hashedPassword;
    try {
      const bcryptModule = require('bcryptjs');
      hashedPassword = await bcryptModule.hash(password, 10);
    } catch (err) {
      // Fallback: Use simple hash if bcryptjs unavailable
      console.warn('[Auth] bcryptjs unavailable, using simple hash');
      hashedPassword = Buffer.from(password).toString('base64');
    }

    const userId = uuidv4();
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      fullName,
      agentName: role === 'agent' ? agentName : null,
      agentCompany: role === 'agent' ? agentCompany : null,
      role: role || 'user',
      createdAt: new Date().toISOString(),
      verified: false
    };

    users.set(userId, user);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, fullName: user.fullName },
      process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        agentName: user.agentName,
        agentCompany: user.agentCompany
      }
    });
  } catch (error) {
    console.error('[Auth Register] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Registration failed: ' + error.message
    });
  }
});

/**
 * POST /api/auth/login
 * Login user or agent
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing email or password'
      });
    }

    // Find user by email
    const user = Array.from(users.values()).find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    let passwordMatch = false;
    try {
      const bcryptModule = require('bcryptjs');
      passwordMatch = await bcryptModule.compare(password, user.password);
    } catch (err) {
      // Fallback: Use simple comparison if bcryptjs unavailable
      console.warn('[Auth] bcryptjs unavailable, using simple comparison');
      passwordMatch = Buffer.from(password).toString('base64') === user.password;
    }

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, fullName: user.fullName },
      process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        agentName: user.agentName,
        agentCompany: user.agentCompany
      }
    });
  } catch (error) {
    console.error('[Auth Login] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Login failed: ' + error.message
    });
  }
});

/**
 * POST /api/auth/verify
 * Verify JWT token validity
 * Requires: Authorization header with Bearer token
 */
router.post('/verify', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    user: req.user
  });
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 * Requires: Authorization header with Bearer token
 */
router.post('/refresh', verifyToken, (req, res) => {
  try {
    const user = req.user;

    // Generate new token
    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role, fullName: user.fullName },
      process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Token refreshed',
      token: newToken
    });
  } catch (error) {
    console.error('[Auth Refresh] Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Token refresh failed: ' + error.message
    });
  }
});

/**
 * GET /api/auth/user
 * Get current user profile
 * Requires: Authorization header with Bearer token
 */
router.get('/user', verifyToken, (req, res) => {
  const user = Array.from(users.values()).find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      agentName: user.agentName,
      agentCompany: user.agentCompany,
      verified: user.verified,
      createdAt: user.createdAt
    }
  });
});

module.exports = router;
