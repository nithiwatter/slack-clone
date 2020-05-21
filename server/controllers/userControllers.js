const User = require('../models/userModel');
const AppError = require('../utils/appError');
const JWT = require('../utils/jwtUtils');

exports.register = async (req, res, next) => {
  try {
    const user = new User({ ...req.body });
    await user.save();

    // Send the JWT token (automatically log in a registered user)
    return JWT.sendJWTToken(user, 200, res);
  } catch (err) {
    return next(new AppError('This username is already used.', 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    // Find the user associated with this username
    const { username, password } = req.body;
    if (!username) return next(new AppError('No username is provided.', 400));

    const user = await User.findOne({ username });
    if (!user)
      return next(new AppError('No user with this username exists', 400));

    // Check if the provided password is correct
    const correct = await user.correctPassword(password, user.password);
    if (!correct) return next(new AppError('Wrong password is provided.', 400));

    // Send JWT Token
    return JWT.sendJWTToken(user, 200, res);
  } catch (err) {
    return next(
      new AppError('Something went wrong while authenticating.', 400)
    );
  }
};

exports.protect = async (req, res, next) => {
  try {
    if (!req.headers['authorization'])
      return next(new AppError('No token sent.', 400));

    // the header is Bearer token
    const user = JWT.verify(req.headers['authorization'].split(' ')[1]);

    // check to make sure if the user embedded within the token exists in DB
    const userInDB = await User.findById(user._id);
    req.user = userInDB;

    // go to the next middleware stack
    next();
  } catch (err) {
    return next(err);
  }
};
