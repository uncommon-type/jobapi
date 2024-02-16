import express from 'express';

import { validateJWT } from './middleware/jwt-validator.js';
import { validateSchema } from './middleware/json-validator.js';
import { jobSchema, jobPostSchema, userSchema, userPostSchema, loginSchema, activitySchema } from './schema.js';
import * as jobService from './service/job.js';
import * as userService from './service/user.js';

export const router = express.Router();

router.get('/jobs', validateJWT, jobService.listJobs);
router.get('/jobs/:id', validateJWT, validateSchema({ params: jobSchema }), jobService.getJob);
router.post('/jobs', validateJWT, validateSchema({ body: jobPostSchema }), jobService.createJob);
router.put('/jobs/:id', validateJWT, validateSchema({ body: jobSchema }), jobService.updateJob);
router.delete('/jobs/:id', validateJWT, jobService.deleteJob);

router.post('/jobs/:id/activities', validateJWT, validateSchema({ body: activitySchema }), jobService.addActivity);
router.put('/jobs/:id/activities/:activityId', validateJWT, validateSchema({ body: activitySchema }), jobService.updateActivity);
router.delete('/jobs/:id/activities/:activityId', validateJWT, jobService.removeActivity);

router.get('/users', validateJWT, userService.listUsers);
router.get('/users/:id', validateJWT, validateSchema({ params: userSchema }), userService.getUser);
router.post('/login', validateSchema({ body: loginSchema }), userService.login);
router.post('/user', validateSchema({ body: userPostSchema }), userService.createUser);
router.put('/users/:id', validateJWT, validateSchema({ body: userSchema }), userService.updateUser);
router.delete('/users/:id', validateJWT, userService.deleteUser);
