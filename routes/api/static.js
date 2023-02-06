const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/upload");
const validator = require("../../validators");

router.get("/:id", [validator.upload.find, validator.check], controller.onFindById);

module.exports = router;
