const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const ViewOrdersController = require('../../Controllers/Farmer/ViewOrdersController');

router.get('/orders', auth, ViewOrdersController.getOrders);
router.patch('/orders/:id', auth, ViewOrdersController.updateOrderStatus);

module.exports = router; 