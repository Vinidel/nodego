const Order = require('../models/order');
const baseUrl = process.env.BASE_URL;

function parseOrdersToResponse(orders) {
  return orders.map(order => {
    return {
      _id: order._id,
      quantity: order.quantity,
      product: order.productId,
      request: {
        type: 'GET',
        url: `${baseUrl}/orders/${order._id}`
      }
    };
  });
}

function getOrders(req, res) {
  Order
  .find()
  .select('product quantity _id')
  .exec()
    .then(orders => {
      res.status(200).json({
        count: orders.length,
        orders: parseOrdersToResponse(orders),
      });    
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        message: 'An error happened'
      });
    });
}

module.exports = getOrders;
