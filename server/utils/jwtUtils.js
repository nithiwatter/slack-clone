const jwt = require('jsonwebtoken');
const AppError = require('./appError');

function signToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

exports.sendJWTToken = (user, statusCode, res) => {
  const token = signToken(user);
  res.status(statusCode).json({
    status: 'success',
    token,
  });
};

exports.verify = (token) => {
  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    throw new AppError('Something is wrong with the token signature', 400);
  }
};
