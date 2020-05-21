const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required.'],
  },
  username: {
    type: String,
    required: [true, 'A username is required.'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email.',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
  },
  truePassword: {
    type: String,
  },
});

userSchema.methods.correctPassword = function (
  providedPassword,
  correctHashedPassword
) {
  return new Promise((resolve) => {
    bcrypt
      .compare(providedPassword, correctHashedPassword)
      .then((result) => resolve(result));
  });
};

userSchema.pre('save', async function (next) {
  if (process.env.NODE_ENV === 'development') {
    this.truePassword = this.password;
  }
  // hashing the password before storing to DB
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
