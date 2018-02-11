const mongoose = require('mongoose');
const Product = require('../models/product');

function getProducts(req, res) {
  return Product.find()
    .exec()
    .then((products => {
      if(products) {
        res.status(200).json({
          products
        });
      } else {
        res.status(400).json({
          message: 'Not list found'
        });
      }
      
    }))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Something went wrong'});
    });  
}

module.exports = getProducts;
