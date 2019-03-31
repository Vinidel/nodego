const jwt = require('jsonwebtoken');
const Token = require('../models/token');

module.exports = async (req, res, next) => {

  try {
    const token = req.header('Authorization').split(" ")[1];
    const dbToken = await Token.find({token}).exec();
    if (dbToken.length) {
      const decoded = jwt.verify(dbToken[0].token, process.env.JWT_KEY);
      req.userData = decoded;
      return next();
    } else {
      return res.status(401).json({message: 'Auth failed'});
    }
  } catch (error) {
    console.log('Auth check error', error);
    res.status(401).json({message: 'Ooops'});
  }

};