import {
  getData,
  addData,
  getById,
  updateData,
  removeData,
} from '../models.js';
import { NotFoundError } from '../config/problem-types.js';
import { ValidationError } from 'express-json-validator-middleware';

export async function listJobs(req, res, next) {
  try {
    const jobs = await getData();

    if (Object.keys(jobs).length === 0) {
      throw new NotFoundError('Jobs not found', 'jobs');
    }

    res.json(jobs);
  } catch (err) {
    next(err);
  }
}

export async function createJob(req, res, next) {
  try {
    const { body: job } = req;

    const existingJob = await getById(job.id);

    if (existingJob) {
      throw new ValidationError('Job already exists');
    }

    const createdJob = await addData(job);
    res.status(201).json(createdJob);
  } catch (err) {
    next(err);
  }
}

export async function getJob(req, res, next) {
  const { id } = req.params;

  try {
    const job = await getById(id);

    if (!job) {
      throw new NotFoundError('Job not found', 'job');
    }

    res.json(job);
  } catch (err) {
    next(err);
  }
}

export async function updateJob(req, res, next) {
  try {
    const { body: job } = req;
    const { id } = req.params;

    if (Object.keys(job).length === 0) {
      throw new ValidationError('empty object');
    }

    const updatedJob = await updateData(id, job);

    if (!updatedJob) {
      throw new NotFoundError('No record to update', 'job');
    }

    res.json(updatedJob);
  } catch (err) {
    next(err);
  }
}

export async function deleteJob(req, res, next) {
  try {
    const { id } = req.params;

    const deletedJob = await removeData(id);

    if (!deletedJob) {
      throw new NotFoundError('No record to delete', 'record');
    }

    res.status(204).json(deletedJob);
  } catch (err) {
    next(err);
  }
}
