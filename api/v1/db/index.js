/* eslint-disable max-len */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.NODE_ENV === 'test' ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB;

const client = new Pool({
  host: process.env.POSTGRES_SERVER,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD || '',
  database
});

// Connect DB
client.connect((err) => {
  // eslint-disable-next-line no-console
  if (!err) return console.log('Connected');
});

export default client;
