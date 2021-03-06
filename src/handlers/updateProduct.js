const mongoose = require('mongoose');
const Product = require('../models/product');

const baseUrl = process.env.BASE_URL;

function updateProduct(req, res) {
  const {id} = req.params;
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
        message: 'Updated',
        request: {
          type: 'GET',
          url: `${baseUrl}/products/${id}`
        }

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Something went wrong'});
    }); 
}

module.exports = updateProduct;