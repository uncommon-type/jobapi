import Client from '@replit/database';
import 'dotenv/config';

const dbURL = process.env.DB_URL;

export async function getData() {
  try {
    const client = new Client(dbURL);
    return await client.getAl();
  } catch (err) {
    console.error(`Failed to getData. ERR:  ${err}`);
    throw err;
  }
}

export async function addData(payload) {
  try {
    const client = new Client(dbURL);
    await client.set(payload.id, payload);
    return payload;
  } catch (err) {
    console.error(`Failed to addData. ERR: ${err}`);
    throw err;
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
    console.error(`Failed to getById.  ERR: ${err}`);
    throw err;
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
    console.error(`Failed to updateData. ERR: ${err}`);
    throw err;
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
    console.error(`Failed to removeData.  ERR: ${err}`);
    throw err;
  }
}

