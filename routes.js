import express from 'express';

import { validateSchema } from './middleware/json-validator.js';
import {
  jobSchema, jobPostSchema, userSchema,
  userPostSchema,
  loginSchema,
} from './schema.js';
import * as jobService from './service/job.js';
import * as userService from './service/user.js';

export const router = express.Router();

router.get('/jobs', jobService.listJobs);
router.get('/jobs/:id', validateSchema({ params: jobSchema }), jobService.getJob);
router.post('/jobs', validateSchema({ body: jobPostSchema }), jobService.createJob);
router.put('/jobs/:id', validateSchema({ body: jobSchema }), jobService.updateJob);
router.delete('/jobs/:id', validateSchema({ params: jobSchema }), jobService.deleteJob);

router.get('/users', userService.listUsers);
router.get('/users/:id', validateSchema({ params: userSchema }), userService.getUser);
router.post('/user', validateSchema({ body: userPostSchema }), userService.createUser);
router.put('/users/:id', validateSchema({ body: userSchema }), userService.updateUser);
router.delete('/users/:id', validateSchema({ params: userSchema }), userService.deleteUser);
router.post('/login', validateSchema({ body: loginSchema }), userService.login);
