const { Router } = require('express')
const apiKey = require('./apiKey')
const balance = require('./balance')
const image = require('./image')
const hash = require('./hash')
const { uploadCors } = require('../../configs/cors')
const router = Router();

router.use('/apikey', apiKey)
router.use('/balance', balance)
router.use('/image', uploadCors, image)
router.use('/hash', hash)

module.exports = router
