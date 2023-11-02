import {
  getData,
  addData,
  getById,
  updateData,
  removeData,
} from '../models.js';

export function createHttpError(statusCode, msg) {
  const err = new Error(msg);
  err.status = statusCode;
  return err;
}

export async function listJobs(req, res, next) {
  try {
    const jobs = await getData();

    if (Object.keys(jobs).length === 0) {
      const err = createHttpError(404, 'Jobs not found');
      throw err;
    }

    res.json(jobs);
  } catch (err) {
    console.error(`Failed to listJobs.  ERR: ${err}`);
    next(err);
  }
}

export async function createJob(req, res, next) {
  try {
    const { body: job } = req;

    // if (Object.keys(job).length === 0) {
    //   const err = createHttpError(400, 'Invalid input');
    //   throw err;
    // }

    const existingJob = await getById(job.id);

    if (existingJob) {
      const err = createHttpError(400, 'Job already exists');
      throw err;
    }

    const createdJob = await addData(job);
    res.status(201).json(createdJob);
  } catch (err) {
    console.error(`Failed to create job. ERR: ${err}`);
    next(err);
  }
}

export async function getJob(req, res, next) {
  const { id } = req.params;

  try {
    const job = await getById(id);

    if (!job) {
      const err = createHttpError(404, 'Job not found');
      throw err;
    }

    res.json(job);
  } catch (err) {
    console.error(`Failed to getJob.   ERR: ${err}`);
    next(err);
  }
}

export async function updateJob(req, res, next) {
  try {
    const { body: job } = req;
    const { id } = req.params;

    if (Object.keys(job).length === 0) {
      const err = createHttpError(400, 'Invalid input');
      throw err;
    }

    const updatedJob = await updateData(id, job);

    if (!updatedJob) {
      const err = createHttpError(404, 'No record to update');
      throw err;
    }

    res.json(updatedJob);
  } catch (err) {
    console.error(`Failed to updateJob. Err: ${err}`);
    next(err);
  }
}

export async function deleteJob(req, res, next) {
  try {
    const { id } = req.params;

    const deletedJob = await removeData(id);

    if (!deletedJob) {
      const err = createHttpError(404, 'No record to delete');
      throw err;
    }

    res.status(204).json(deletedJob);
  } catch (err) {
    console.error(`Failed to deleteJob. Err: ${err}`);
    next(err);
  }
}

