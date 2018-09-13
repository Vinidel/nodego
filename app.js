const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const userRoute = require('./api/routes/users');
const cors = require('cors');
const app = express();

//DB
// mongoose
//   .connect(`mongodb://node-shop-api:${process.env.MONGO_KEY}@node-shop-cluster-shard-00-00-9weg9.mongodb.net:27017,node-shop-cluster-shard-00-01-9weg9.mongodb.net:27017,node-shop-cluster-shard-00-02-9weg9.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-cluster-shard-0&authSource=admin&retryWrites=true`)
//   // .connect(`mongodb://localhost/node-shop`)
//   .then(() => console.log('DB connected Successfully'))
//   .catch(err => console.log('Not connected to DB', err.errors[0].err));

//Data parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
app.use(cors());

//Logging
app.use(morgan('dev'));

app.get('/sup', (req, res) => {
  res.status(200).json({message: 'Whats up'});
});

//Auth
app.use((req, res, next) => {
  //this must be used to handle all authentication for the api
  // console.log('Heyyyyy yeah');
  next();
});

//Routes
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);


app.get('/btc-price', (req, res) => {
  console.log('hereeee');
  res.status(200).json({BTC: {USD: '2000.00'}});
});
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
