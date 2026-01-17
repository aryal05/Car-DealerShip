import express from 'express';
import {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getFilterOptions,
  getStats
} from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/vehicles', getVehicles);
router.get('/vehicles/filters', getFilterOptions);
router.get('/vehicles/stats', getStats);
router.get('/vehicles/:id', getVehicle);
router.post('/vehicles', createVehicle);
router.put('/vehicles/:id', updateVehicle);
router.delete('/vehicles/:id', deleteVehicle);

export default router;
