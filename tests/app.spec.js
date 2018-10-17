import { expect } from 'chai';
import supertest from 'supertest';

import app from '../app/app';

const request = supertest(app);

describe('GET /', () => {
  it('Should load route', (done) => {
    request
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Store Manager 1.0');
        done();
      });
  });
});
