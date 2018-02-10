const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    message: 'A list of orders'
  });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    message: 'Order details',
    id
  });
});


router.post('/', (req, res) => {
  const {id} = req.params;
  res.status(201).json({
    message: 'Order created'
  });
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    message: `Order ${id} updated`,
    id
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    message: `Order ${id} deleted`,
    id
  });
});


module.exports = router;