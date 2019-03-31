const mongoose = require('mongoose');
const Product = require('../models/product');

function getProductDetails(req, res) {
  const {id} = req.params;
  Product.findById(id)
    .exec()
    .then(product => {

      if(product) {
        res.status(200).json({
          product
        });
      } else {
        res.status(400).json({
          message: 'Product not found'
        });
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Something went wrong'});
    });
}

module.exports = getProductDetails;
