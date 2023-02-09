const { param, body } = require("express-validator");

module.exports = {
  find: [param("id").notEmpty().withMessage("is empty")],

  deleteById: [param("id").notEmpty().withMessage("is empty")],

  deleteByUrl: [body("url").notEmpty().withMessage("is empty").isURL()],
};
