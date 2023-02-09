const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/balance");
const validator = require("../../validators");
const auth = require("../auth");

router.get("/", controller.onGetAll);
router.get("/:id", [validator.balance.findById, validator.check], controller.onGetById);
router.post("/", [validator.balance.create, validator.check], controller.onCreate);
router.put("/:id", [validator.balance.update, validator.check], controller.onUpdate);
router.delete("/:id", controller.onDelete);

module.exports = router;
