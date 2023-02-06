const { param } = require("express-validator");

module.exports = {
  find: [param("id").notEmpty().withMessage("is empty")],
  delete: [param("id").notEmpty().withMessage("is empty")],
};
