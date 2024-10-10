import express from 'express'
import { all_interviews, create_interview, interview_of_candidate, update_interview, update_interview_status } from '../controllers/interview_controller.js'
import { authenticateToken } from '../controllers/auth_controller.js'
import { id_based_jobs_applicants } from '../controllers/candidate_controller.js'
const router = express.Router()

router.post('/schedule-interview',create_interview)
router.get('/all-interviews', authenticateToken,all_interviews)
router.get('/candidate-interview/:id',authenticateToken,interview_of_candidate)
router.post('/update-interview/:id',update_interview)
router.post('/update-candidate-interview-status/:id',update_interview_status)
router.get('/job_applicants/:id',authenticateToken,id_based_jobs_applicants)

export default router