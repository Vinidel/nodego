const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {generateToken} = require('../util/token');

const DUPLICATE_EMAIL_CODE = 11000;

function signUp(req, res) {
  const {email, password} = req.body;

  if (!email || ! password) {
    return res.status(400).json({
      message: 'Password and Email are required'
    });
  }

  bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: 'Could not store password'
        });
      } else {
        const user = new User({
          _id: mongoose.Types.ObjectId(),
          email,
          password: hash
        });

        user
          .save()
          .then((result) => {
            const token = generateToken({email: result.email, userId: result.id});
            res.status(200).json({
              token,
              message: 'User created'
            });
          })
          .catch((err) => {
            console.log(err);
            let message = 'Ooops something went wrong!!!';
            let statusCode = 500;
            if (err.code === DUPLICATE_EMAIL_CODE) {
              statusCode = 400;
              message = 'Email already in use';
            }
            res.status(statusCode).json({
              message
            });  
          });
      }
    });
}

module.exports = signUp;