import express from 'express'
import { add_candidate, all_candidates, delete_candidate, module_data, my_candidates, reporting_to_users, send_data_by_id, update_candidate } from '../controllers/candidate_controller.js';
import { authenticateToken } from '../controllers/auth_controller.js';
const router = express.Router()

router.post('/add-candidate',add_candidate)
router.get('/reporting-user',authenticateToken,reporting_to_users)
router.get('/all-candidates',authenticateToken,all_candidates)
router.get('/my-candidates',authenticateToken,my_candidates)
router.get('/delete-candidate/:id',authenticateToken,delete_candidate)
router.get('/candidate-info/:id',authenticateToken,send_data_by_id)
router.post('/update-candidate/:id',update_candidate)
router.get("/all-modules",module_data)


export default router;