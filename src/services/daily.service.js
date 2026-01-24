import prisma from '../../DB/db.config.js';
import { DAILY_MESSAGES } from '../constants/messages.js';

// Create a new record
export const createDailyRecord = async (data) => {
  return await prisma.dailyRecord.create({ data });
};

// Get all records for a truckNumber
export const getDailyRecordsByTruck = async (truckId) => {
  return await prisma.dailyRecord.findMany({
    where: { truckId, isDeleted: false },
    orderBy: { date: 'desc' }
  });
};

// Get all records for a truck in a specific month and year
export const getDailyRecordsByTruckAndMonth = async (truckId, year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // Last day of the month

  return await prisma.dailyRecord.findMany({
    where: {
      truckId,
      isDeleted: false,
      date: {
        gte: startDate,
        lte: endDate,
      }
    },
    orderBy: { date: 'desc' }
  });
};

// Get all daily records for all trucks in a specific month and year
export const getDailyRecordsByMonthYear = async (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // Last day of the month

  return await prisma.dailyRecord.findMany({
    where: {
      isDeleted: false,
      date: {
        gte: startDate,
        lte: endDate,
      }
    },
    include: {
      truck: true,
    },
    orderBy: [
      { truck: { truckNumber: 'asc' } },
      { date: 'desc' }
    ]
  });
};

// Get by record id
export const getDailyRecordById = async (id) => {
  const record = await prisma.dailyRecord.findUnique({ where: { id: Number(id) } });
  if (!record || record.isDeleted) throw { status: 404, message: DAILY_MESSAGES.NOT_FOUND };
  return record;
};

// Update record
export const updateDailyRecord = async (id, data) => {
  await getDailyRecordById(id);
  return await prisma.dailyRecord.update({
    where: { id: Number(id) },
    data
  });
};

// Delete record (soft delete)
export const deleteDailyRecord = async (id) => {
  await getDailyRecordById(id);
  return await prisma.dailyRecord.update({
    where: { id: Number(id) },
    data: { isDeleted: true }
  });
};
