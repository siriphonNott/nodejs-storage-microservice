import { Router } from 'express'
import api from './api/index.js'
import staticRoute from './api/static.js'
const router = Router();

router.use(`/api/v1`, api);
router.use(`/static`, staticRoute);

export default router
