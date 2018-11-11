import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));
app.use(express.static('ui'))

app.use('/api/v1/', routes);

// Error Handling
app.use('*', (req, res) => {
  res.status(404).json({
    msg: 'This is Store Manager, the page you are looking for is not found',
  });
});

export default app;
