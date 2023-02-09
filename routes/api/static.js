const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/image");
const validator = require("../../validators");

router.get("/:id", [validator.image.find, validator.check], controller.onFindById);

module.exports = router;
