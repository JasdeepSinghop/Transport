import * as dailyService from '../services/daily.service.js';
import * as truckService from '../services/truck.service.js';
import { DAILY_MESSAGES } from '../constants/messages.js';

export const createDailyRecordHandler = async (req, res) => {
  try {
    const { truckNumber } = req.params;

    // Get truck internal id from truckNumber
    const truck = await truckService.getTruckByNumber(truckNumber);

    const {
      date,
      kilometer,
      fuelLiters,
      fuelPrice,
      invoiceNumber,
      invoiceCompanyName,
      invoiceType,
      invoiceDate,
      invoicePrice,
      notes
    } = req.body;

    const record = await dailyService.createDailyRecord({
      // truckNumber,    // store truckNumber in record
      truckId: truck.id,  // internal relation
      date: date ? new Date(date) : new Date(),
      kilometer,
      fuelLiters,
      fuelPrice,
      invoiceNumber,
      invoiceCompanyName,
      invoiceType,
      invoiceDate: invoiceDate ? new Date(invoiceDate) : null,
      invoicePrice,
      notes
    });

    return res.status(201).json({
      success: true,
      data: record,
      message: DAILY_MESSAGES.CREATED
    });

  } catch (err) {
    console.error("Error creating daily record:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

export const getDailyRecordsByTruckHandler = async (req, res, next) => {
  try {
    const { truckNumber } = req.params;

    const truck = await truckService.getTruckByNumber(truckNumber);

    const records = await dailyService.getDailyRecordsByTruck(truck.id);

    return res.status(200).json({
      success: true,
      data: records
    });

  } catch (err) { next(err); }
};

export const updateDailyRecordHandler = async (req, res, next) => {
  try {
    const record = await dailyService.updateDailyRecord(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      data: record,
      message: DAILY_MESSAGES.UPDATED
    });

  } catch (err) { next(err); }
};

export const deleteDailyRecordHandler = async (req, res, next) => {
  try {
    await dailyService.deleteDailyRecord(req.params.id);

    return res.status(200).json({
      success: true,
      message: DAILY_MESSAGES.DELETED
    });

  } catch (err) { next(err); }
};
