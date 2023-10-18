const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phoneNumber: Number,
  avatar: String,
  password: String,
  role: String,
});

module.exports = mongoose.model('Users', usersSchema);
