const { Router } = require("express");
const router = Router();
const controller = require("../../controllers/hash");

router.post("/generate", controller.onGenerateHash);
router.post("/check", controller.onCheckHash);

module.exports = router;
