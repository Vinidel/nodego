const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  User.find({email: req.body.email}).exec()
    .then(user => {
      if (!user.length) {
        return res.status(401).json({message: 'Auth failed'});
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        console.log(err, result);
        if (err) {
          console.log(err);
          return res.status(401).json({message: 'Auth failed'});
        }

        if (result) {
          const token = jwt.sign({email: user[0].email, userId: user[0].id}, process.env.JWT_KEY, {
            expiresIn: '1h'
          });
          return res.status(200).json({message: 'Auth successful', token});          
        }

        return res.status(401).json({message: 'Auth failed'});

      }); 


    })
    .catch(e => {
      res.status(500).json({error: e});
    });  
};