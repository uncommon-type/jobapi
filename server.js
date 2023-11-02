import express from 'express';
import logger from 'morgan';

import { router } from './routes.js';
import * as error from './middleware/error.js';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(router);
app.use(error.notFound);
app.use(error.errorMiddleware);

app.listen(port, () => console.log(`App listening on port ${port}`));
