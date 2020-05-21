module.exports = (err, req, res, next) => {
  console.log(err);

  const sentError = {
    status: err.status,
    error: err.message,
  };

  res.status(err.statusCode).json(sentError);
};
