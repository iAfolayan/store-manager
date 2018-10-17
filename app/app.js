import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import home from './controllers/home';

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1/', home);

export default app;
