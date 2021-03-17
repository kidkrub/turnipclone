const User = require('../models/Users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', session: false },
    (email, password, done) => {
      User.findOne({ email: email }, function (err, user) {
        if (err) return done(null, false, { message: err });
        if (!user) return done(null, false, { message: 'User not found' });
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return done(null, false, { message: err });
          if (result) return done(null, user);
          return done(null, false, { message: 'Wrong password' });
        });
      });
    }
  )
);

module.exports = passport;
