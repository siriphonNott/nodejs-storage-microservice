const { body, param } = require("express-validator");

module.exports = {
  findById: [
    param("id").notEmpty().withMessage("is empty"),
  ],

  create: [
    body("label").notEmpty().withMessage("is empty"),
    body("typeId").notEmpty().withMessage("is empty"),
    body("userId").notEmpty().withMessage("is empty"),
  ],

  update: [
    param("id").notEmpty().withMessage("is empty"),
  ],
};
