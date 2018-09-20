const express = require('express');
const router = express.Router();
const signUp = require('../handlers/signUp');
const deleteUser = require('../handlers/deleteUser');
const login = require('../handlers/login');
const logoutUser = require('../handlers/logout');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', signUp);
router.post('/login', login);
router.delete('/logout', checkAuth, logoutUser);
router.delete('/:userId', checkAuth, deleteUser);

module.exports = router;