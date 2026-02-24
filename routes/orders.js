const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Checkout and create order
 *     tags: [Orders]
 */
router.post('/', orderController.createOrder);

module.exports = router;