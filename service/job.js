import {
  getData,
  addData,
  getById,
  updateData,
  removeData,
} from '../models.js';
import { NotFoundError } from '../config/problem-types.js';
import { ValidationError } from 'express-json-validator-middleware';

const prefix = 'job';

export const listJobs = async (req, res, next) => {
  try {
    const jobs = await getData(prefix);

    if (Object.keys(jobs).length === 0) {
      throw new NotFoundError('Jobs not found', 'jobs');
    }

    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const { body: job } = req;

    const existingJob = await getById(job.id, prefix);

    if (existingJob) {
      throw new ValidationError('Job already exists');
    }

    const createdJob = await addData(job, prefix);

    res.status(201).json(createdJob);
  } catch (err) {
    next(err);
  }
};

export const getJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await getById(id, prefix);

    if (!job) {
      throw new NotFoundError('Job not found', 'job');
    }

    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const { body: job } = req;
    const { id } = req.params;

    if (Object.keys(job).length === 0) {
      throw new ValidationError('empty object');
    }

    const updatedJob = await updateData(id, job, prefix);

    if (!updatedJob) {
      throw new NotFoundError('No record to update', 'job');
    }

    res.json(updatedJob);
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedJob = await removeData(id, prefix);

    if (!deletedJob) {
      throw new NotFoundError('No record to delete', 'record');
    }

    res.status(204).json(deletedJob);
  } catch (err) {
    next(err);
  }
};
