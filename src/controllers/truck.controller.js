import * as truckService from '../services/truck.service.js';
import { TRUCK_MESSAGES } from '../constants/messages.js';

export const createTruckHandler = async (req, res, next) => {
  try {
    const truck = await truckService.createTruck(req.body);

    return res.status(201).json({
      success: true,
      message: TRUCK_MESSAGES.CREATED,
      data: truck
    });

  } catch (err) {
    next(err);
  }
};

export const getAllTrucksHandler = async (req, res, next) => {
  try {
    const trucks = await truckService.getAllTrucks();

    return res.status(200).json({
      success: true,
      data: trucks
    });

  } catch (err) {
    next(err);
  }
};
export const getTruckHandler = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckByNumber(req.params.truckNumber);

    return res.status(200).json({
      success: true,
      data: truck
    });

  } catch (err) { next(err); }
};

export const updateTruckHandler = async (req, res, next) => {
  try {
    const truck = await truckService.updateTruck(req.params.truckNumber, req.body);

    return res.status(200).json({
      success: true,
      data: truck,
      message: TRUCK_MESSAGES.UPDATED
    });

  } catch (err) { next(err); }
};

export const deleteTruckHandler = async (req, res, next) => {
  try {
    await truckService.deleteTruck(req.params.truckNumber);

    return res.status(200).json({
      success: true,
      message: TRUCK_MESSAGES.DELETED
    });

  } catch (err) { next(err); }
};
