const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  token: { type: String, unique : true, required : true, dropDups: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

module.exports = mongoose.model('Token', tokenSchema);
