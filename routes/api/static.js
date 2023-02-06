import { Router } from 'express'
const router = Router();
import controller from '../../controllers/upload.js'
import validator from '../../validators/index.js'

router.get('/:id', [validator.upload.find, validator.check], controller.onFindById)

export default router
