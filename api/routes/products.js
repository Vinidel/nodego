const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');
const createProduct = require('../handlers/createProduct');
const getProducts = require('../handlers/getProducts');
const getProductDetails = require('../handlers/getProductDetails');
const updateProduct = require('../handlers/updateProduct');
const deleteProduct = require('../handlers/deleteProduct');
const checkAuth = require('../middleware/check-auth');

router.get('/', getProducts);
router.post('/', checkAuth, createProduct);
router.get('/:id', getProductDetails);
router.patch('/:id', checkAuth, updateProduct);
router.delete('/:id', checkAuth, deleteProduct);

module.exports = router;