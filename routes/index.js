const { Router } = require("express");
const api = require("./api");
const staticRoute = require("./api/static");
const config = require("../configs/app");
const router = Router();

router.use(`/api/v1`, api);
router.use(`/static`, staticRoute);
router.use("/api$/", (req, res) => {
  res.send({
    apiVersion: +config.apiVersion,
    buildVersion: +config.buildVersion,
  });
});

module.exports = router;
