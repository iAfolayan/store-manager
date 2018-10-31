import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.NODE_ENV === 'test' ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB;

let credential = null;
if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production') {
  credential = process.env.DATABASE_URL;
} else {
  credential = {
    host: process.env.POSTGRES_SERVER,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database
  };
}

const client = new Pool(credential);

// Connect DB
client.connect((err) => {
  if (!err) return console.log('connected');
});

export default client;
