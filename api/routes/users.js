const express = require('express');
const router = express.Router();
const signUp = require('../handlers/signUp');
const deleteUser = require('../handlers/deleteUser');
const login = require('../handlers/login');

router.post('/signup', signUp);
router.post('/login', login);
router.delete('/:userId', deleteUser);

module.exports = router;