import express from 'express'
import { all_interviews, create_interview, interview_of_candidate, update_interview, update_interview_status } from '../controllers/interview_controller.js'
import { authenticateToken } from '../controllers/auth_controller.js'
const router = express.Router()

router.post('/schedule-interview',create_interview)
router.get('/all-interviews', authenticateToken,all_interviews)
router.get('/candidate-interview',authenticateToken,interview_of_candidate)
router.post('/update-interview',update_interview)
router.post('/update-candidate-interview-status',update_interview_status)

export default router