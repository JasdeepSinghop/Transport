import prisma from '../../DB/db.config.js';
import { TRUCK_MESSAGES } from '../constants/messages.js';

export const createTruck = async (data) => {
  // Only allow truckNumber field
  const { truckNumber } = data;

  if (!truckNumber) {
    throw { status: 400, message: "truckNumber is required" };
  }

  return await prisma.truck.create({
    data: { truckNumber }
  });
};

export const getAllTrucks = async () => {
  return await prisma.truck.findMany({
    orderBy: { id: 'asc' }
  });
};

export const getTruckByNumber = async (truckNumber) => {
  const truck = await prisma.truck.findUnique({
    where: { truckNumber }
  });

  if (!truck) throw { status: 404, message: TRUCK_MESSAGES.NOT_FOUND };
  return truck;
};

export const updateTruck = async (truckNumber, data) => {
  await getTruckByNumber(truckNumber); // ensures exists

  return await prisma.truck.update({
    where: { truckNumber },
    data
  });
};

export const deleteTruck = async (truckNumber) => {
  await getTruckByNumber(truckNumber);

  return await prisma.truck.update({
    where: { truckNumber },
    data: { isDeleted: true }
  });
};
