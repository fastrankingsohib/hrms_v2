import express from 'express'
import { add_comment, delete_comment, display_comment } from '../controllers/comments_controller.js';
const router = express.Router()

router.post('/add-comments',add_comment)
router.get('/display-comments/:id',display_comment)
router.get('/delete-comment/:id',delete_comment)

export default router;