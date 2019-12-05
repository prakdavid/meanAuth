const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: String,
  lastname: String,
  firstname: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;