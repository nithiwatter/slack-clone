const express = require('express');
const userController = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/verify', userController.protect, (req, res) => {
  console.log(req.user);
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});

module.exports = userRouter;
