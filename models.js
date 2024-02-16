import Client from '@replit/database';

import { ServerError } from './config/problem-types.js';

const dbURL = process.env.DB_URL;

export const getBy = async (tableName, field, fieldValue) => {
  try {
    const records = await getData(tableName);

    const entry = Object.values(records).find((record) => {
      return record[field] === fieldValue;
    });

    return entry ? entry : null;
  } catch (err) {
    throw new ServerError(`Failed to getBy - ${err.message}`);
  }
};

export const getData = async (tableName) => {
  try {
    const client = new Client(dbURL);
    const data = await client.getAll();

    return Object.fromEntries(
      Object.entries(data).filter(([key]) => key.startsWith(tableName))
    );
  } catch (err) {
    throw new ServerError(`Failed to getData - ${err.message}`);
  }
};

export const addData = async (payload, tableName) => {
  try {
    const client = new Client(dbURL);
    await client.set(`${tableName}:${payload.id}`, payload);
    return payload;
  } catch (err) {
    throw new ServerError(`Failed to addData - ${err.message}`);
  }
};

export const getById = async (id, tableName) => {
  try {
    const client = new Client(dbURL);
    const record = await client.get(`${tableName}:${id}`);

    if (!record) {
      return null;
    }

    return record;
  } catch (err) {
    throw new ServerError(`Failed to getById  - ${err.message}`);
  }
};

export const updateData = async (id, payload, tableName) => {
  try {
    const recordToUpdate = await getById(id, tableName);

    if (!recordToUpdate) {
      return null;
    }

    const updatedRecord = { ...recordToUpdate, ...payload };

    const client = new Client(dbURL);
    await client.set(`${tableName}:${id}`, updatedRecord);

    return updatedRecord;
  } catch (err) {
    throw new ServerError(`Failed to updateData. ERR: ${err.message}`);
  }
};

export const removeData = async (id, tableName) => {
  try {
    const recordToDelete = await getById(id, tableName);

    if (!recordToDelete) {
      return null;
    }

    const client = new Client(dbURL);
    await client.delete(`${tableName}:${id}`);

    return {};
  } catch (err) {
    throw new ServerError(`Failed to removeData.  ERR: ${err.message}`);
  }
};

