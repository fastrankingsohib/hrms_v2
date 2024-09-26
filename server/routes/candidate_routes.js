import express from 'express'
import { add_candidate, reporting_to_users } from '../controllers/candidate_controller.js';
import { authenticateToken } from '../controllers/auth_controller.js';
const router = express.Router()

router.post('/add-candidate',add_candidate)
router.get('/reporting-user',authenticateToken,reporting_to_users)


export default router;