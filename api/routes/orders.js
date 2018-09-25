const express = require('express');
const router = express.Router();
const createOrder = require('../handlers/createOrder');
const getOrders = require('../handlers/getOrders');
const getOrderDetails = require('../handlers/getOrderDetails');
const deleteOrder = require('../handlers/deleteOrder');
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, getOrders);
router.get('/:id', checkAuth, getOrderDetails);
router.post('/', checkAuth, createOrder);
router.delete('/:id', checkAuth, deleteOrder);

module.exports = router;