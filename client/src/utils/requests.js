exports.setTokenHeadersOptions = () => {
  const token = localStorage.getItem('token');
  return { Authorization: 'Bearer ' + token };
};
