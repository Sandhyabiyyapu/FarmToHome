const express = require('express');
const router = express.Router();

// Import sub-routes
const addProductRoutes = require('./farmer/addProductRoutes');
const manageProductsRoutes = require('./farmer/manageProductsRoutes');
const viewOrdersRoutes = require('./farmer/viewOrdersRoutes');
const earningsRoutes = require('./farmer/earningsRoutes');

// Use sub-routes
router.use('/', addProductRoutes);
router.use('/', manageProductsRoutes);
router.use('/', viewOrdersRoutes);
router.use('/', earningsRoutes);

module.exports = router; 