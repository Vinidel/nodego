const jwt = require('jsonwebtoken');

module.exports.generateToken = ({email, userId} = {}) => {
  const token = jwt.sign({email, userId}, process.env.JWT_KEY, {
    expiresIn: '1h'
  });

  return token;
}