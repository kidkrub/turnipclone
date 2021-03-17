const passport = require('passport');
const { AppError } = require('../helpers/AppError');

exports.local_signup = function (req, res, next) {
  const { email, password } = req.body;
  
};

exports.local_login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(new AppError(err, 400));
    if (!user) return next(new AppError(info.message, 400));
    req.logIn(user, function (err) {
      if (err) return next(new AppError(err, 400));
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
  })(req, res, next);
};

exports.logout = function (req, res, next) {
  req.logout();
  req.session.destroy(function (err) {
    if (err) return next(new AppError(err, 400));
    res.json({ sucess: 'loged out' });
  });
};
