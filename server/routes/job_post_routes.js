import express from 'express'
import { active_job_posts, delete_posts, display_posted_jobs, id_based_jobs, inactive_job_posts, latest_created_job, post_jobs, update_post_job } from '../controllers/job_post_controller.js'
import { authenticateToken } from '../controllers/auth_controller.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploadedpdf/')); 
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /pdf|csv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and CSV files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } 
});



//ROUTES
//ROUTES
//ROUTES
//ROUTES
//ROUTES

router.post('/post_job', upload.single('file'), post_jobs);
router.get('/display_jobs',authenticateToken,display_posted_jobs)
router.get('/id_based_jobs/:id',authenticateToken,id_based_jobs)
router.post('/update_job_post/:id',update_post_job)
router.get('/delete/:id',authenticateToken,delete_posts)
router.get('/latest_job_post',authenticateToken,latest_created_job)
router.get('/active_jobs',authenticateToken,active_job_posts)
router.get('/inactive_jobs',authenticateToken,inactive_job_posts)

export default router








