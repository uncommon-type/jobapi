import express from 'express';

import * as jobService from './service/job.js';

export const router = express.Router();

router.get('/jobs', jobService.listJobs);
router.get('/jobs/:id', jobService.getJob);
router.post('/jobs', jobService.createJob);
router.put('/jobs/:id', jobService.updateJob);
router.delete('/jobs/:id', jobService.deleteJob);


