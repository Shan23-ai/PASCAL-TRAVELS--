/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Middleware to verify JWT token in Authorization header
 * Expected format: Authorization: Bearer <token>
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Missing or invalid authorization token'
    });
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || config.jwt?.secret || 'dev-secret');
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
        expired: true
      });
    }
    return res.status(403).json({
      success: false,
      message: 'Invalid token: ' + error.message
    });
  }
}

/**
 * Middleware to verify agent token
 * Agents must be authenticated and have agent role
 */
function verifyAgentToken(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'agent') {
      return res.status(403).json({
        success: false,
        message: 'This endpoint requires agent role'
      });
    }
    next();
  });
}

/**
 * Middleware to verify admin token
 */
function verifyAdminToken(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'This endpoint requires admin role'
      });
    }
    next();
  });
}

/**
 * Middleware to optionally verify token
 * Does not fail if token is missing, but validates it if present
 */
function optionalVerifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || config.jwt?.secret || 'dev-secret');
    req.user = decoded;
  } catch (error) {
    // Silently ignore token errors for optional auth
    console.log('[Auth] Optional token validation failed:', error.message);
  }
  
  next();
}

module.exports = {
  verifyToken,
  verifyAgentToken,
  verifyAdminToken,
  optionalVerifyToken
};
