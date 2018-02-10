const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const app = express();


//Data parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if(req.method == 'OPTIONS') {
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }

  next();
});

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