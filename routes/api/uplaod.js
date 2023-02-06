import { Router } from 'express'
const router = Router();
import controller from '../../controllers/upload.js'
import validator from '../../validators/index.js'

router.post('/', controller.onUpload)
router.delete('/:id', [validator.upload.delete, validator.check], controller.onDelete)

export default router
