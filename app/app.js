import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1', routes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message,
    },
  });
});

export default app;
