const { body, param } = require("express-validator");

module.exports = {
  findById: [
    param("id").notEmpty().withMessage("is empty"),
  ],

  create: [
    body("userId").notEmpty().withMessage("is empty"),
    body("planId").notEmpty().withMessage("is empty"),
    body("apiKey").notEmpty().withMessage("is empty"),
    body("quotaRemain").notEmpty().withMessage("is empty").isNumeric(),
  ],

  update: [
    param("id").notEmpty().withMessage("is empty"),
  ],
};
