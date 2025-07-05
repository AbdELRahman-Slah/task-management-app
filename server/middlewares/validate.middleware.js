const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new AppError(errors.array({ onlyFirstError: true })[0].msg, 400));
  }

  next();
};

module.exports = validate;
