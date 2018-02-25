const Order = require('../models/order');

function getOrders(req, res) {
  const {id} = req.params;
  Order.findById(id)
  .populate('product')
  .exec()
  .then(Order => {
    if(Order) {
      res.status(200).json({
        Order
      });
    } else {
      res.status(400).json({
        message: 'Order not found'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Something went wrong'});
  });
}

module.exports = getOrders;
