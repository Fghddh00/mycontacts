const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.NOT_FOUND_ERROR:
      res.json({
        title: "Not Found",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED_ERROR:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.FORBIDDEN_ERROR:
      res.json({
        title: "Forbidden",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    default:
      console.log(err.stack);
      break;
  }
};

module.exports = errorHandler;
