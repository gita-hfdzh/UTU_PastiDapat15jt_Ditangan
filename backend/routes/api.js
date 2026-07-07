const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');
const { createOrder } = require('../controllers/orderController');

// Product routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Order/Checkout routes
router.post('/checkout', createOrder);

module.exports = router;
