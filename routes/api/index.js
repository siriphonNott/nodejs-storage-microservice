import { Router } from 'express'
import upload from './uplaod.js'
const router = Router();

router.use('/upload', upload)


export default router
