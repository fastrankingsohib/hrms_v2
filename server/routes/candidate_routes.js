import express from 'express'
import { authenticateToken } from '../controllers/auth_controller.js'
import { reporting_to_users } from '../controllers/candidate_controller.js'
const router = express()

router.get('/reporting-to-users', authenticateToken, reporting_to_users)

export default router