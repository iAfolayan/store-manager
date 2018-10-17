import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Store Manager 1.0'
  });
});

export default app;
