const mongoose = require('mongoose');
const Product = require('../models/product');

function getProducts(req, res) {
  return Product.find()
  .select('name price _id')
    .exec()
    .then((products => {
      if(products) {
        res.status(200).json({
          count: products.length,
          products: products.map((p) => ({
            name: p.name,
            price: p.price,
            _id: p._id,
            request: {
              type: 'GET',
              url: `http://localhost:3000/products/${p._id}`
            }
          }))
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
