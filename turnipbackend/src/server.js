const express = require('express');
const cors = require('cors');
const mongoose = require('./db/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 3000;
const { AppErrorHandler, AppError } = require('./helpers/AppError');
const passport = require('./passport/setup');
const app = express();


app.get('/', (req, res, next) => {
  res.json({ message: 'hello world' });
});


app.get('/error', (req, res, next) => {
  throw new AppError('Test Error', 400);
});

const mongoosecnn = mongoose.connection;

mongoosecnn.once('open', () => {
  console.log('mongoDB connected');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({ origin: 'http://localhost:8000', credentials: true }));
  app.use(
    session({
      secret: 'god only knows',
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoosecnn }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(require('./routes'));
  app.use(AppErrorHandler);

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});

mongoosecnn.on('error', () => {
  console.error.bind(console, 'MongoDB connection error:');
  process.exit();
});
