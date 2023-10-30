import express from 'express';
import logger from 'morgan';

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send('hello')
})

app.use(logger('dev'));

app.listen(port, () => console.log(`App listening on port ${port}`));