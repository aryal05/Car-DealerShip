import express from 'express';
import upload from '../middleware/upload.js';
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
} from '../controllers/brandController.js';

const router = express.Router();

// Public routes
router.get('/brands', getAllBrands);
router.get('/brands/:id', getBrandById);

// Admin routes (with file upload support)
router.post('/brands', upload.single('image'), createBrand);
router.put('/brands/:id', upload.single('image'), updateBrand);
router.delete('/brands/:id', deleteBrand);

export default router;
