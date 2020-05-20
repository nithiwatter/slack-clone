const User = require('../models/userModel');

exports.register = async (req, res, next) => {
  try {
    const user = new User({ ...req.body });
    await user.save();

    res.status(201).send({
      status: 'success',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: 'failure',
    });
  }
};
