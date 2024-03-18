const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //   error for mongoose bad id
  if (err.name === "CastError") {
    const message = `Project not found in this DB with ${err.value} id`;
    error = new ErrorResponse(message, 400);
  }
  //   mongoose duplicate error
  if (err.code === 11000) {
    const message = `Duplicate error: Title should be unique`;
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};
module.exports = errorHandler;
