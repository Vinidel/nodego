const mongoose = require('mongoose'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Token = require('../models/token');

module.exports = (req, res) => {
  User.find({email: req.body.email}).exec()
    .then(user => {
      if (!user.length) {
        return res.status(401).json({message: 'Auth failed'});
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).json({message: 'Auth failed'});
        }

        if (result) {
          const token = jwt.sign({email: user[0].email, userId: user[0].id}, process.env.JWT_KEY, {
            expiresIn: '1h'
          });

          const dbToken = new Token({
            _id: mongoose.Types.ObjectId(),
            token,
            user: user[0]._id
          });

          return dbToken
            .save()
            .then((result) => {
              return res.status(200).json({message: 'Auth successful', token:  result.token, email: user[0].email});          
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({message: 'Auth failed'});
            });
        }

        return res.status(401).json({message: 'Auth failed'});

      }); 


    })
    .catch(e => {
      res.status(500).json({error: e});
    });  
};