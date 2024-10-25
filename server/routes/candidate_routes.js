// Filename: routes/candidate_routes.js

import express from 'express';
import {
  add_candidate,
  add_job_application,
  all_candidates,
  candidate_applied_based_jobs,
  delete_candidate,
  hierarchical_candidates_list,
  id_based_jobs_applicants,
  module_data,
  my_candidates,
  send_data_by_id,
  specific_job_status_update,
  update_candidate,
  update_candidate_status
} from '../controllers/candidate_controller.js';
import { authenticateToken } from '../controllers/auth_controller.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import checkPermissions from '../Middlewares/checkpermissions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath = path.join(__dirname, '../public/uploaded_images/');

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

const upload = multer({ storage }).fields([
  { name: 'candidate_image', maxCount: 5 },
  { name: 'candidate_aadhar', maxCount: 5 },
  { name: 'candidate_pan', maxCount: 5 },
  { name: 'candidate_highest_qualification', maxCount: 5 },
  { name: 'candidate_resume', maxCount: 5 }
]);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
  next();
});

// Routes

router.post('/add-candidate', upload, (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'create';
  next();
}, authenticateToken, checkPermissions, add_candidate);

router.get('/all-candidates', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'read';
  next();
}, authenticateToken, checkPermissions, all_candidates);

router.post('/my-candidates', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'read';
  next();
}, authenticateToken, checkPermissions, my_candidates);

router.get('/delete-candidate/:id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'delete';
  next();
}, authenticateToken, checkPermissions, delete_candidate);

router.get('/candidate-info/:id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'read';
  next();
}, authenticateToken, checkPermissions, send_data_by_id);

router.post('/update-candidate/:id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'update';
  next();
}, authenticateToken, checkPermissions, update_candidate);

router.get('/all-modules', (req, res, next) => {
  req.body.module_name = 'Modules';
  req.body.action = 'read';
  next();
}, authenticateToken, checkPermissions, module_data);

router.get('/job_applicants/:id/:user_id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'read';
  next();
}, authenticateToken, checkPermissions, id_based_jobs_applicants);

router.get('/applicants-applied-jobs/:id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'read';
  next();
}, authenticateToken, checkPermissions, candidate_applied_based_jobs);

router.post('/update-candidate-status/:id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'update';
  next();
}, authenticateToken, checkPermissions, update_candidate_status);

router.post('/specific-job-status-update/:job_id/:candidate_id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'update';
  next();
}, authenticateToken, checkPermissions, specific_job_status_update);

router.post('/add_job_application', (req, res, next) => {
  req.body.module_name = 'Job Applications';
  req.body.action = 'create';
  next();
}, authenticateToken, checkPermissions, add_job_application);

router.get('/hierarchical_candidate_list/:id', (req, res, next) => {
  req.body.module_name = 'Candidates';
  req.body.action = 'read';
  next();
}, authenticateToken, checkPermissions, hierarchical_candidates_list);

export default router;
