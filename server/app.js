const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const globalErrorController = require('./controllers/errorControllers');

const app = express();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  return next(new AppError('Cannot find this route on this server.', 404));
});
app.use(globalErrorController);

module.exports = app;
