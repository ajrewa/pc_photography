const env = require("../config/env");
const ApiError = require("../utils/ApiError");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let error = err;

  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500;
    let message = error.message || "Internal server error";
    let errors = [];

    // Mongoose bad ObjectId
    if (error.name === "CastError") {
      statusCode = 400;
      message = `Invalid value for field '${error.path}'`;
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      statusCode = 400;
      message = "Validation failed";
      errors = Object.values(error.errors).map((e) => ({
        field: e.path,
        message: e.message,
      }));
    }

    // Mongo duplicate key
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue || {})[0];
      message = field ? `'${field}' already exists` : "Duplicate value";
      errors = [{ field, message }];
    }

    // JSON body parse errors
    if (error.type === "entity.parse.failed") {
      statusCode = 400;
      message = "Malformed JSON in request body";
    }

    error = new ApiError(statusCode, message, errors);
  }

  const payload = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors && error.errors.length ? error.errors : undefined,
    stack: env.NODE_ENV === "development" ? error.stack : undefined,
  };

  res.status(error.statusCode || 500).json(payload);
}

module.exports = errorHandler;
