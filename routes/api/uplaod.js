const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/upload");
const validator = require("../../validators");

router.post("/", controller.onUpload);
router.delete("/:id", [validator.upload.delete, validator.check], controller.onDelete);

module.exports = router;
