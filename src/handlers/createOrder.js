const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

const baseUrl = process.env.BASE_URL;

function checkIfProductExists(id) {
  return Product
    .findById(id)
    .exec()
    .then(product => {
      if(product) {
        return Promise.resolve(product);
      } else {
        return Promise.reject(new Error(`Product with id ${id} doesn't exist`));
      }
    });
}

function createOrder(req, res) {
  const {quantity, productId} = req.body;
  checkIfProductExists(productId)
    .then(() => {
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity,
        product: productId
      });
      
      order
      .save()
      .then(order => {
        res.status(201).json({
          order,
          request: {
            type: 'GET',
            url: `${baseUrl}/orders/${order._id}`
          }
        });
      })
      .catch((err) => {
        console.log('Error creating an order: ', err);
        res.status(400).json({
          message: 'Order not created'
        });
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message
      });
    }); 
}

module.exports = createOrder;