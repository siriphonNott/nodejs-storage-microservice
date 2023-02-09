const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/image");
const validator = require("../../validators");
const auth = require("../auth");

router.post("/upload", auth.checkApiKey, controller.onUpload);
router.delete("/", [validator.image.deleteByUrl, validator.check], controller.onDeleteByUrl);
router.delete("/:id", [validator.image.deleteById, validator.check], controller.onDeleteById);

module.exports = router;
