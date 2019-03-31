const User = require('../models/user');

function deleteUser(req, res) {
  const {userId} = req.params;
  User.remove({_id: userId})
    .exec()
    .then((data) => {
      res.status(200).json({
        message: `User with id ${userId} deleted`,
        result: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Something went wrong'});
    });
}

module.exports = deleteUser;