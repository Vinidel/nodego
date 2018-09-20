const User = require('../models/user');
const Token = require('../models/token');

function logout(req, res) {
  const httpToken = req.body.token;
   Token.findOneAndRemove({token: httpToken}).exec()
    .then(data => {
      res.status(200).json({message: 'Successfully logged out'});
    })
    .catch(error => {
      console.log('Logout error', error);
      res.status(400).json({message: 'No'});
    });
}

module.exports = logout;