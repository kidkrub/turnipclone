exports.profile = function (req, res, next) {
  if (req.user) {
    res.send('Already logged in');
  } else {
    res.send('Not Logged in')
  }
};
