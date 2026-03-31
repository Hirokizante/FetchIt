const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getAllProducts);

router.get('/products/:id', shopController.getProductDetails);

module.exports = router;