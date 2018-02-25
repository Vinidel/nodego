const Order = require('../models/order');

function deleteProduct(req, res) {
  const {id} = req.params;
  Product.remove({_id: id})
    .exec()
    .then((data) => {
      res.status(200).json({
        message: `Product with id ${id} deleted`,
        result: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Something went wrong'});
    });
}

module.exports = deleteProduct;