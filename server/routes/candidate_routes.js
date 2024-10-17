import express from 'express';
import {
  add_candidate,
  all_candidates,
  delete_candidate,
  id_based_count_all_applicants,
  id_based_count_rejected_candidates,
  id_based_count_shortlisted_applicants,
  id_based_jobs_applicants,
  id_based_jobs_applicants_rejected,
  id_based_jobs_applicants_shortlisted,
  module_data,
  my_candidates,
  reporting_to_users,
  send_data_by_id,
  update_candidate
} from '../controllers/candidate_controller.js';
import {
  authenticateToken
} from '../controllers/auth_controller.js';
import multer from 'multer';
import path from 'path';
import {
  fileURLToPath
} from 'url';

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath = path.join(__dirname, '../public/uploaded_images/'); // Default path

    switch (file.fieldname) {
      case 'candidate_image':
      case 'candidate_aadhar':
      case 'candidate_pan':
      case 'candidate_highest_qualification':
        folderPath = path.join(__dirname, '../public/uploaded_images/');
        break;
      case 'candidate_resume':
        folderPath = path.join(__dirname, '../public/uploaded_candidate_pdf/');
        break;
      default:
        break;
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage
}).fields([{
    name: 'candidate_image',
    maxCount: 5
  }, 
  {
    name: 'candidate_aadhar',
    maxCount: 5
  }, 
  {
    name: 'candidate_pan',
    maxCount: 5
  },
  {
    name: 'candidate_highest_qualification',
    maxCount: 5
  },
  {
    name: 'candidate_resume',
    maxCount: 5
  }
]);

// Error handling middleware for Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
  next();
});

// Routes
router.post('/add-candidate', upload, add_candidate);
router.get('/reporting-user', authenticateToken, reporting_to_users);
router.get('/all-candidates', authenticateToken, all_candidates);
router.post('/my-candidates', authenticateToken, my_candidates);
router.get('/delete-candidate/:id', authenticateToken, delete_candidate);
router.get('/candidate-info/:id', authenticateToken, send_data_by_id);
router.post('/update-candidate/:id', authenticateToken, update_candidate);
router.get("/all-modules", module_data);
router.get('/job_applicants/:id', authenticateToken, id_based_jobs_applicants);
router.get('/applicants_number_job/:id',authenticateToken,id_based_count_all_applicants);
router.get('/shortlisted_job_candidates/:id',authenticateToken,id_based_count_shortlisted_applicants);
router.get('/rejected_job_candidates/:id',authenticateToken,id_based_count_rejected_candidates)
router.get('/job_applicants_shortlisted/:id', authenticateToken, id_based_jobs_applicants_shortlisted);
router.get('/job_applicants_rejected/:id', authenticateToken, id_based_jobs_applicants_rejected);



export default router;