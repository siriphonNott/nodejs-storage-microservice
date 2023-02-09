const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/apiKey");
const validator = require("../../validators");
const auth = require("../auth");

router.get("/", controller.onGetAll);
router.get("/:id", [validator.apiKey.findById, validator.check], controller.onGetById);
router.post("/", [validator.apiKey.create, validator.check], controller.onCreate);
router.put("/:id", [validator.apiKey.update, validator.check], controller.onUpdate);
router.delete("/:id", controller.onDelete);

module.exports = router;
