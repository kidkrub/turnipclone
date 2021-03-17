class AppError extends Error {
  constructor(message, status) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
  }
}

const throwAppError = function (err, res) {
  const { status, message } = err;
  res.status(status).json({ error: message });
};

const AppErrorHandler = function (err, req, res, next) {
  throwAppError(err, res);
};

module.exports = { AppError, AppErrorHandler };
