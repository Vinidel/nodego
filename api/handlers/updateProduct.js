const mongoose = require('mongoose');
const Product = require('../models/product');

function updateProduct(req, res) {
  const {id, name, price} = req.params;
  const updateOps = {};

  for(const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({_id: id}, {
    $set: 
    updateOps
  })
    .exec()
    .then(product => {
      res.status(200).json({
        product
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Something went wrong'});
    }); 
}

module.exports = updateProduct;