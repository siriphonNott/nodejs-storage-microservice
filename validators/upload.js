import { param } from 'express-validator'

export default {
  find: [
    param('id').notEmpty().withMessage('is empty'),
  ],
  delete: [
    param('id').notEmpty().withMessage('is empty'),
  ],
}
