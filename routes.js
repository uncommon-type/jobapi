import express from 'express';

import { validateSchema } from './middleware/json-validator.js';
import { jobSchema, jobPostSchema } from './schema.js';
import * as jobService from './service/job.js';

export const router = express.Router();

router.get('/jobs', jobService.listJobs);
router.get('/jobs/:id', validateSchema({ params: jobSchema }), jobService.getJob);
router.post('/jobs', validateSchema({ body: jobPostSchema }), jobService.createJob);
router.put('/jobs/:id', validateSchema({ body: jobSchema }), jobService.updateJob);
router.delete('/jobs/:id', validateSchema({ params: jobSchema }), jobService.deleteJob);
