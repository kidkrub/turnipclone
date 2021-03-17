const { AppError } = require('../helpers/AppError');
const validateEmail = function (req, res, next) {
  const { email } = req.body;
  if (!email) return next(new AppError('email is required', 400));
  const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  if (!emailRegex.test(email)) {
    return next(new AppError('email is invalid', 400));
  }
  next();
};
const validatePassword = function (req, res, next) {
  const { password } = req.body;
  if (!password) return next(new AppError('password is required', 400));
  if (password.length < 6) return next(new AppError('password is too short'));
  next();
};

module.exports = { validateEmail, validatePassword };
