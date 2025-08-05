const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const ManageProductsController = require('../../Controllers/Farmer/ManageProductsController');

router.get('/products', auth, ManageProductsController.getProducts);
router.get('/products/:id', auth, ManageProductsController.getProduct);
router.patch('/products/:id', auth, ManageProductsController.updateProduct);
router.delete('/products/:id', auth, ManageProductsController.deleteProduct);

module.exports = router; 