const express = require('express');
const morgan = require('morgan');
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const app = express();

//Logging
app.use(morgan('dev'));

//Routes
app.use('/products', productRoute);
app.use('/orders', orderRoute);

//Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res
  .status(error.status || 500)
  .json({error: {
      message: error.message
    }
  });
});

module.exports = app;