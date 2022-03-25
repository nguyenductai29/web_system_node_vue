import express from 'express'

import { transition, callApi } from '../controllers/index.js'

const router = express.Router()

router.post('/api/transition', transition)

export default router
