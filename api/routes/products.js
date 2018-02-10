const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Getting a list of products'
  });
});

router.post('/', (req, res) => {
  const product = req.body;
  res.status(201).json({
    message: 'Creating a product',
    product
  });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  if(id == 'special') {
    res.status(200).json({
      message: 'A special id',
      id
    });
  } else {
    res.status(200).json({
      message: 'U passed an Id'
    });
  }
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    message: `Product with id ${id} updated`,
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    message: `Product with id ${id} deleted`,
  });
});

module.exports = router;