const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const createOrder = require('../handlers/createOrder');
const getOrders = require('../handlers/getOrders');
const getOrderDetails = require('../handlers/getOrderDetails');
const deleteOrder = require('../handlers/deleteOrder');

router.get('/', getOrders);
router.get('/:id', getOrderDetails);
router.post('/', createOrder);
router.delete('/:id', deleteOrder);

module.exports = router;