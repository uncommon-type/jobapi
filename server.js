import express from 'express';
import logger from 'morgan';

import { router } from './routes.js';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`App listening on port ${port}`));
