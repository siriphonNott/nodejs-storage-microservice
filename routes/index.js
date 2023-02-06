import { Router } from "express";
import api from "./api/index.js";
import staticRoute from "./api/static.js";
import config from "../configs/app.js";
const router = Router();

router.use(`/api/v1`, api);
router.use(`/static`, staticRoute);
router.use("/api$/", (req, res) => {
  res.send({
    apiVersion: +config.apiVersion,
    buildVersion: +config.buildVersion,
  });
});

export default router;
