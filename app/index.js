import http from 'http';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();
const port = parseInt(process.env.PORT || 3000, 10);
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log('Server failed to start!');
  }
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${port}`);
});
