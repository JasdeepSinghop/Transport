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

export const getDailyRecordsByTruckAndMonthHandler = async (req, res, next) => {
  try {
    const { truckNumber, year, month } = req.params;

    if (!truckNumber || !year || !month) {
      return res.status(400).json({
        success: false,
        message: "truckNumber, year, and month are required",
      });
    }

    const truck = await truckService.getTruckByNumber(truckNumber);
    if (!truck) {
      return res.status(404).json({
        success: false,
        message: `Truck with number "${truckNumber}" not found`,
      });
    }

    const records = await dailyService.getDailyRecordsByTruckAndMonth(
      truck.id,
      parseInt(year),
      parseInt(month)
    );

    // Calculate totals for the month
    const totals = records.reduce(
      (acc, record) => ({
        totalKilometer: acc.totalKilometer + (record.kilometer || 0),
        totalFuelLiters: acc.totalFuelLiters + (record.fuelLiters || 0),
        totalFuelPrice: acc.totalFuelPrice + (record.fuelPrice || 0),
        totalInvoicePrice: acc.totalInvoicePrice + (record.invoicePrice || 0),
      }),
      {
        totalKilometer: 0,
        totalFuelLiters: 0,
        totalFuelPrice: 0,
        totalInvoicePrice: 0,
      }
    );

    return res.status(200).json({
      success: true,
      data: records,
      totals: totals,
      count: records.length,
      truck: {
        truckNumber: truck.truckNumber,
        truckName: truck.truckName
      }
    });

  } catch (err) {
    console.error("Error getting daily records by truck and month:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

export const getDailyRecordsByMonthYearHandler = async (req, res, next) => {
  try {
    const { year, month } = req.params;

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "year and month are required",
      });
    }

    const records = await dailyService.getDailyRecordsByMonthYear(
      parseInt(year),
      parseInt(month)
    );

    return res.status(200).json({
      success: true,
      data: records,
      count: records.length
    });

  } catch (err) {
    console.error("Error getting daily records by month and year:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
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
