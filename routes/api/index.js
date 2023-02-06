const { Router } = require('express')
const upload = require('./uplaod')
const router = Router();

router.use('/upload', upload)

module.exports = router
