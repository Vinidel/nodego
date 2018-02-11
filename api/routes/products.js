const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');
const createProduct = require('../handlers/createProduct');
const getProducts = require('../handlers/getProducts');
const getProductDetails = require('../handlers/getProductDetails');
const updateProduct = require('../handlers/updateProduct');
const deleteProduct = require('../handlers/deleteProduct');

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductDetails);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;