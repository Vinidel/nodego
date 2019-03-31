function deleteOrder(req, res) {
  const {id} = req.params;
  Order.remove({_id: id})
  .exec()
  .then((data) => {
    res.status(200).json({
      message: `Order with id ${id} deleted`,
      result: data
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Something went wrong'});
  });
}

module.exports = deleteOrder;
