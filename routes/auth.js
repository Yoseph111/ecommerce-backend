const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 */
router.post('/register', authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 */
router.post('/login', authController.login);

module.exports = router;