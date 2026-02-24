const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/**
 * @openapi
 * /cart:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart
 */
router.post('/', cartController.addItemToCart);

/**
 * @openapi
 * /cart/{user_id}:
 *   get:
 *     summary: Get all cart items for a user
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns list of cart items
 */
router.get('/:user_id', cartController.getCartByUser);

module.exports = router;