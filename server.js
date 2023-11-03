import express from 'express';
import logger from 'morgan';

import { router } from './routes.js';
import { problemTypes } from './config/problem-types.js';
import { configureProblemDetailsResponse } from './middleware/problem-details-response.js';
import { notFound } from './middleware/error.js';

const app = express();
const port = 3000;
const problemDetailsResponseMiddleware =
  configureProblemDetailsResponse(problemTypes);

app.use(logger('dev'));
app.use(express.json());
app.use(router);
app.use(notFound);
app.use(problemDetailsResponseMiddleware);

app.listen(port, () => console.log(`App listening on port ${port}`));
