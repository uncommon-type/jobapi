import express from 'express';

import { validateJWT } from './middleware/jwt-validator.js';
import { validateSchema } from './middleware/json-validator.js';
import {
  jobSchema, jobPostSchema, userSchema,
  userPostSchema,
  loginSchema,
} from './schema.js';
import * as jobService from './service/job.js';
import * as userService from './service/user.js';

export const router = express.Router();

router.get('/jobs', validateJWT, jobService.listJobs);
router.get('/jobs/:id', validateJWT, validateSchema({ params: jobSchema }), jobService.getJob);
router.post('/jobs', validateJWT, validateSchema({ body: jobPostSchema }), jobService.createJob);
router.put('/jobs/:id', validateJWT, validateSchema({ body: jobSchema }), jobService.updateJob);
router.delete('/jobs/:id', validateJWT, validateSchema({ params: jobSchema }), jobService.deleteJob);

router.get('/users', validateJWT, userService.listUsers);
router.get('/users/:id', validateSchema({ params: userSchema }), userService.getUser);
router.post('/user', validateSchema({ body: userPostSchema }), userService.createUser);
router.put('/users/:id', validateJWT, validateSchema({ body: userSchema }), userService.updateUser);
router.delete('/users/:id', validateJWT, validateSchema({ params: userSchema }), userService.deleteUser);
router.post('/login', validateSchema({ body: loginSchema }), userService.login);
