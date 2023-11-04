import Client from '@replit/database';

import { ServerError } from './config/problem-types.js';

const dbURL = process.env.DB_URL;

export const getBy = async (prefix, field, fieldValue) => {
  try {
    const records = await getData(prefix);

    const entry = Object.values(records).find((record) => {
      return record[field] === fieldValue;
    });

    return entry ? entry : null;
  } catch (err) {
    throw new ServerError(`Failed to getBy - ${err.message}`);
  }
};

export const getData = async (prefix) => {
  try {
    const client = new Client(dbURL);
    const data = await client.getAll();

    return Object.fromEntries(
      Object.entries(data).filter(([key]) => key.startsWith(prefix))
    );
  } catch (err) {
    throw new ServerError(`Failed to getData - ${err.message}`);
  }
};

export const addData = async (payload, prefix) => {
  try {
    const client = new Client(dbURL);
    await client.set(`${prefix}:${payload.id}`, payload);
    return payload;
  } catch (err) {
    throw new ServerError(`Failed to addData - ${err.message}`);
  }
};

export const getById = async (id, prefix) => {
  try {
    const client = new Client(dbURL);
    const record = await client.get(`${prefix}:${id}`);

    if (!record) {
      return null;
    }

    return record;
  } catch (err) {
    throw new ServerError(`Failed to getById  - ${err.message}`);
  }
};

export const updateData = async (id, payload, prefix) => {
  try {
    const recordToUpdate = await getById(id, prefix);

    if (!recordToUpdate) {
      return null;
    }

    const updatedRecord = { ...recordToUpdate, ...payload };

    const client = new Client(dbURL);
    await client.set(`${prefix}:${id}`, updatedRecord);

    return updatedRecord;
  } catch (err) {
    throw new ServerError(`Failed to updateData. ERR: ${err.message}`);
  }
};

export const removeData = async (id, prefix) => {
  try {
    const recordToDelete = await getById(id, prefix);

    if (!recordToDelete) {
      return null;
    }

    const client = new Client(dbURL);
    await client.delete(`${prefix}:${id}`);

    return {};
  } catch (err) {
    throw new ServerError(`Failed to removeData.  ERR: ${err.message}`);
  }
};

