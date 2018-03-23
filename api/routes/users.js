const express = require('express');
const router = express.Router();
const signUp = require('../handlers/signUp');
const deleteUser = require('../handlers/deleteUser');

router.post('/signup', signUp);
router.delete('/:userId', deleteUser);

module.exports = router;