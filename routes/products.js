const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Returns list of products
 */
router.get('/', productController.getAllProducts);

module.exports = router;