/* eslint-disable no-undef */
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../api/v1/app';

const request = supertest(app);
let token = '';

const dummyData = {
  catid: 'cjobxnbnj00009osdzvy0g6qe',
  catname: 'PhonesSQL'
};

const updateData = {
  catname: 'Wireless Micphone',
};

const categoryId = 'cjobxnbnj00009osdzvy0g6qe';

const user = {
  staffId: 'SM001',
  password: 'admin'
};


describe('Category routes', () => {
  before((done) => {
    // runs before all tests in this block
    request
      .post('/api/v1/auth/login')
      .set('Content-Type', 'Application/json')
      .send(user)
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  describe('Create a Category', () => {
    it('should create a category', (done) => {
      request
        .post('/api/v1/category')
        .set('Content-Type', 'Application/json')
        .set('authorization', token)
        .send(dummyData)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });
});

describe('GET available categories', () => {
  it('should get all available categories', (done) => {
    request
      .get('/api/v1/category')
      .set('authorization', token)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.data).to.be.an('array');
        const categories = res.body.data;
        categories.forEach((category) => {
          expect(category).to.be.an('object');
          expect(category).to.haveOwnProperty('catname');
          expect(category).to.haveOwnProperty('catid');
        });
        done();
      });
  });
});

describe('Update category', () => {
  it('should update a category', (done) => {
    request
      .put(`/api/v1/category/${categoryId}`)
      .set('authorization', token)
      .send(updateData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});

describe('POST Delete a category', () => {
  it('should be able to delete a category', (done) => {
    request
      .delete(`/api/v1/category/${categoryId}`)
      .set('authorization', token)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});
