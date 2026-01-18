import express from 'express';
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

// Admin routes
router.post('/brands', createBrand);
router.put('/brands/:id', updateBrand);
router.delete('/brands/:id', deleteBrand);

export default router;
