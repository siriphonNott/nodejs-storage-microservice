const { validationResult } = require("express-validator");

// Import Validators
const image = require("./image");
const apiKey = require("./apiKey");
const balance = require("./balance");

const validators = {
  image,
  apiKey,
  balance
};

module.exports = {
  check(req, res, next) {
    let errors = validationResult(req).array();
    if (errors.length == 0) return next();
    let error = new Error(`${errors[0].param}: ${errors[0].msg}`);
    error.status = 422;
    throw error;
  },
  ...validators,
};
