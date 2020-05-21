const express = require('express');
const userController = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/protected', userController.protect, (req, res) => {
  console.log(req.user);
  res.send('Access granted.');
});

module.exports = userRouter;
