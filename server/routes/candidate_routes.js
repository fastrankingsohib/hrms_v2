import express from 'express';
import {
  add_candidate,
  all_candidates,
  delete_candidate,
  id_based_jobs_applicants,
  module_data,
  my_candidates,
  reporting_to_users,
  send_data_by_id,
  update_candidate
} from '../controllers/candidate_controller.js';
import { authenticateToken } from '../controllers/auth_controller.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath = path.join(__dirname, '../public/uploaded_images/'); // Default path

    // Customize path based on file fieldname
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

// Configure Multer to accept multiple files for each field
const upload = multer({ storage: storage }).fields([
  { name: 'candidate_image', maxCount: 5 }, // Allow up to 5 images
  { name: 'candidate_aadhar', maxCount: 5 }, // Allow up to 5 Aadhar files
  { name: 'candidate_pan', maxCount: 5 }, // Allow up to 5 PAN files
  { name: 'candidate_highest_qualification', maxCount: 5 }, // Allow up to 5 qualification files
  { name: 'candidate_resume', maxCount: 5 } // Allow up to 5 resumes
]);

// Error handling middleware for Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    // Handle other errors
    return res.status(500).json({ success: false, message: err.message });
  }
  next();
});

// Routes
router.post('/add-candidate',  upload, add_candidate);
router.get('/reporting-user', authenticateToken, reporting_to_users);
router.get('/all-candidates', authenticateToken, all_candidates);
router.get('/my-candidates', authenticateToken, my_candidates);
router.delete('/delete-candidate/:id', authenticateToken, delete_candidate);
router.get('/candidate-info/:id', authenticateToken, send_data_by_id);
router.put('/update-candidate/:id', authenticateToken, upload, update_candidate);
router.get("/all-modules", module_data);
router.get('/job_applicants/:id', authenticateToken, id_based_jobs_applicants);

export default router;
