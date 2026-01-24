import express from 'express';
import {
  createDailyRecordHandler,
  getDailyRecordsByTruckHandler,
  getDailyRecordsByTruckAndMonthHandler,
  updateDailyRecordHandler,
  deleteDailyRecordHandler
} from '../controllers/daily.controller.js';

const router = express.Router();

// All routes use truckNumber instead of id
router.post('/newrecord/:truckNumber', createDailyRecordHandler);          // Create daily record
router.get('/watch/:truckNumber', getDailyRecordsByTruckHandler);      // Get all daily records of a truck
router.get('/truck/:truckNumber/:year/:month', getDailyRecordsByTruckAndMonthHandler); // Get daily records for truck in specific month
router.put('/update/:id', updateDailyRecordHandler);             // Update a daily record by its id
router.delete('/delete/:id', deleteDailyRecordHandler);          // Delete a daily record by id

export default router;
