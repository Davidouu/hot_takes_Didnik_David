const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// permet de faire en sort qu'il n'y ai pas plusieurs compte avec le même mail

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);