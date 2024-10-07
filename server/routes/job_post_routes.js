import express from 'express'
import { delete_posts, display_posted_jobs, id_based_jobs, latest_created_job, post_jobs, update_post_job } from '../controllers/job_post_controller.js'
import { authenticateToken } from '../controllers/auth_controller.js'
const router = express()

router.post('/post_job',post_jobs)
router.get('/display_jobs',authenticateToken,display_posted_jobs)
router.get('/id_based_jobs/:id',authenticateToken,id_based_jobs)
router.post('/update_job_post/:id',update_post_job)
router.get('/delete/:id',authenticateToken,delete_posts)
router.get('/latest_job_post',authenticateToken,latest_created_job)

export default router