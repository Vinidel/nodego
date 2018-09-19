const mongoose = require('mongoose');
const Product = require('../models/product');

const baseUrl = process.env.BASE_URL;

function createProduct(req, res) {
  const {name, price} = req.body;
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name,
    price
  });

  return product.save()
    .then((data) => {
      res.status(201).json({
        name: data.name,
        price: data.price,
        _id: data._id,
        request: {
          type: 'GET',
          url: `${baseUrl}/products/${data._id}`
        }
      });
    })
    .catch((err) => {
      console.log('Error saving Product ', err);
      res.status(400).json({
        message: 'Could not create the Product',
      });
    });
}

module.exports = createProduct;