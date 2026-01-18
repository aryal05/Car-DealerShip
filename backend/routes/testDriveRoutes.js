import express from 'express';
import {
  submitTestDrive,
  getAllTestDrives,
  getTestDriveById,
  updateTestDriveStatus,
  deleteTestDrive,
  getTestDriveStats
} from '../controllers/testDriveController.js';

const router = express.Router();

// Public route - submit test drive request
router.post('/test-drives', submitTestDrive);

// Admin routes - manage test drive requests
router.get('/test-drives', getAllTestDrives);
router.get('/test-drives/stats', getTestDriveStats);
router.get('/test-drives/:id', getTestDriveById);
router.put('/test-drives/:id/status', updateTestDriveStatus);
router.delete('/test-drives/:id', deleteTestDrive);

export default router;
