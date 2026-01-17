import express from 'express';
import upload from '../middleware/upload.js';
import {
  adminLogin,
  getBannerImages,
  addBannerImage,
  updateBannerOrder,
  updateBannerImage,
  deleteBannerImage,
  getVehicleImages,
  addVehicleImages,
  deleteVehicleImage,
  bulkCreateVehicles
} from '../controllers/adminController.js';

const router = express.Router();

// Admin authentication
router.post('/admin/login', adminLogin);

// Banner management
router.get('/admin/banners', getBannerImages);
router.post('/admin/banners', addBannerImage);
router.put('/admin/banners/order', updateBannerOrder);
router.put('/admin/banners/:id', updateBannerImage);
router.delete('/admin/banners/:id', deleteBannerImage);

// Vehicle images
router.get('/admin/vehicles/:vehicleId/images', getVehicleImages);
router.post('/admin/vehicles/images', addVehicleImages);
router.delete('/admin/vehicles/images/:id', deleteVehicleImage);

// Image upload endpoint
router.post('/admin/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const imageUrl = `https://car-dealership-production-3c2c.up.railway.app/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bulk operations
router.post('/admin/vehicles/bulk', bulkCreateVehicles);

export default router;
