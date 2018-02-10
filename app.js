const express = require('express');
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const app = express();

//Routes
app.use('/products', productRoute);
app.use('/orders', orderRoute);

module.exports = app;