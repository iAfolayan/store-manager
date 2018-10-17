import {
  expect
} from 'chai';
import http from 'http';
import supertest from 'supertest';

import app from '../app/app';

const request = supertest(http.createServer(app));

describe('GET /api/v1/', () => {
  it('Should load route', (done) => {
    request
      .get('/api/v1/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Store Manager 1.0');
        done();
      });
  });
});
