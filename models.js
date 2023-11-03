import Client from '@replit/database';
import 'dotenv/config';

import { ServerError } from './config/problem-types.js';

const dbURL = process.env.DB_URL;

export async function getData() {
  try {
    const client = new Client(dbURL);
    return await client.getAll();
  } catch (err) {
    throw new ServerError(`Failed to getData - ${err.message}`);
  }
}

export async function addData(payload) {
  try {
    const client = new Client(dbURL);
    await client.set(payload.id, payload);
    return payload;
  } catch (err) {
    throw new ServerError(`Failed to addData - ${err.message}`);
  }
}

export async function getById(id) {
  try {
    const client = new Client(dbURL);
    const record = await client.get(id);

    if (!record) {
      return null;
    }

    return record;
  } catch (err) {
    throw new ServerError(`Failed to getById  - ${err.message}`);
  }
}

export async function updateData(id, payload) {
  try {
    const recordToUpdate = await getById(id);

    if (!recordToUpdate) {
      return null;
    }

    const updatedRecord = { ...recordToUpdate, ...payload };

    const client = new Client(dbURL);
    await client.set(id, updatedRecord);

    return updatedRecord;
  } catch (err) {
    throw new ServerError(`Failed to updateData. ERR: ${err.message}`);
  }
}

export async function removeData(id) {
  try {
    const recordToDelete = await getById(id);

    if (!recordToDelete) {
      return null;
    }

    const client = new Client(dbURL);
    await client.delete(id);

    return {};
  } catch (err) {
    throw new ServerError(`Failed to removeData.  ERR: ${err.message}`);
  }
}

