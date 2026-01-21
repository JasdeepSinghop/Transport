import express from 'express';
import {
  createTruckHandler,
  getAllTrucksHandler,
  getTruckHandler,
  updateTruckHandler,
  deleteTruckHandler
} from '../controllers/truck.controller.js';

const router = express.Router();

router.post('/', createTruckHandler);
router.get('/', getAllTrucksHandler);
router.get('/:truckNumber', getTruckHandler);
router.put('/:truckNumber', updateTruckHandler);
router.delete('/:truckNumber', deleteTruckHandler);

export default router;
