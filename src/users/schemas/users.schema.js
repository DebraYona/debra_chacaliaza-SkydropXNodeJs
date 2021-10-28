const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

const UsersModel = mongoose.model('User', usersSchema);

module.exports = UsersModel;
