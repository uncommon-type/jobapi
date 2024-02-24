import { getData, addData, getById, updateData, removeData } from '../models.js';
import { NotFoundError } from '../config/problem-types.js';
import { ValidationError } from 'express-json-validator-middleware';

const jobTable = 'job';
const activityTable = 'activity';

export const listJobs = async (req, res, next) => {
    try {
        const jobs = await getData(jobTable);

        if (Object.keys(jobs).length === 0) {
            throw new NotFoundError('Jobs not found', 'jobs');
        }

        res.json(jobs);
    } catch (err) {
        next(err);
    }
}

export const createJob = async (req, res, next) => {
    try {
        const { body: job } = req;

        const existingJob = await getById(job.id, jobTable);

        if (existingJob) {
            throw new ValidationError('Job already exists');
        }

        const createdJob = await addData(job, jobTable);

        res.status(201).json(createdJob);
    } catch (err) {
        next(err);
    }
}

export const getJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await getById(id, jobTable);

        if (!job) {
            throw new NotFoundError('Job not found', 'job');
        }

        let activityIds = job.activities;

        if (!activityIds) {
            activityIds = [];
        }
        const activities = await Promise.all(activityIds.map(async (activityId) => {
            return await getById(activityId, activityTable);
        }));

        job.activities = activities;
        res.json(job);
    } catch (err) {
        next(err);
    }
}

export const updateJob = async (req, res, next) => {
    try {
        const { body: job } = req;
        const { id } = req.params;

        if (Object.keys(job).length === 0) {
            throw new ValidationError('empty object');
        }

        const updatedJob = await updateData(id, job, jobTable);

        if (!updatedJob) {
            throw new NotFoundError('No record to update', 'job');
        }

        res.json(updatedJob);
    } catch (err) {
        next(err);
    }
}

export const deleteJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedJob = await removeData(id, jobTable);

        if (!deletedJob) {
            throw new NotFoundError('No record to delete', 'record');
        }

        res.status(204).json(deletedJob);
    } catch (err) {
        next(err);
    }
}

export const addActivity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body: activity } = req;
        let job = await getById(id, jobTable);

        if (!job) {
            throw new NotFoundError('Job not found', jobTable);
        }

        const existingActivity = await getById(activity.id, activityTable);

        if (existingActivity) {
            throw new ValidationError('Activity already exists');
        }

        const createdActivity = await addData(activity, activityTable);

        job.activities = [...new Set([...job.activities, createdActivity.id])];
        updateData(id, { activities: job.activities }, jobTable)

        res.status(201).json(createdActivity);
    } catch (err) {
        next(err);
    }
}

export const updateActivity = async (req, res, next) => {
    try {
        const { body: activity } = req;
        const { activityId } = req.params;

        if (Object.keys(activity).length === 0) {
            throw new ValidationError('empty object');
        }

        const updatedActivity = await updateData(activityId, activity, activityTable);

        if (!updatedActivity) {
            throw new NotFoundError('No record to update', 'activity');
        }

        res.json(updatedActivity);
    } catch (err) {
        next(err);
    }
}

export const removeActivity = async (req, res, next) => {
    try {
        const { activityId, id } = req.params;
        let job = await getById(id, jobTable);

        if (!job) {
            throw new NotFoundError('Job not found', jobTable);
        }

        if (!job.activities.includes(activityId)) {
            throw new NotFoundError('Activity not found for this job', 'activity');
        }

        const deletedActivity = await removeData(activityId, activityTable);

        if (!deletedActivity) {
            throw new NotFoundError('No record to delete', 'record');
        }

        job.activities = job.activities.filter((id) => id !== activityId);

        updateData(id, { activities: job.activities }, jobTable);

        res.status(204).json(deletedActivity);
    } catch (err) {
        next(err);
    }
}
