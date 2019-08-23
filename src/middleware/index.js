const config = require("../config");
const { logger } = require("../utils").Logger.getInstance(config.env);

const notFound = (req, res, next) => {
  logger.error(`404 Not Found - ${req.originalUrl} Originated: ${req.ip}`);

  res.status(404);
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(
    `Server error - ${req.originalUrl} Originated: ${req.ip} message: ${
      err.message
    } stack:${err.stack}`
  );

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production" ? "An error occurred" : err.stack
  });
};

module.exports = {
  notFound,
  errorHandler
};
