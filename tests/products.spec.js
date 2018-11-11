/* eslint-disable no-undef */
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../api/v1/app';

const request = supertest(app);
let token = '';

const dummyData = {
  id: 'cjobxnbnj00009osdzvy0g6qe',
  productname: 'Wireless Mic',
  price: 4000,
  quantity: 10,
  description: 'test product',
  category: 'phone',
  minimumallowed: 200,
  image: 'tet.png'
};

const updateData = {
  productname: 'Wireless Micphone',
  price: 4000,
  quantity: 10,
  description: 'test product',
  category: 'phone',
  minimumallowed: 200,
  image: 'tet.png'
};

const productId = 'cjobxnbnj00009osdzvy0g6qe';

const user = {
  staffId: 'SM001',
  password: 'admin'
};

describe('GET /api/v1', () => {
  it('Should load route', (done) => {
    request
      .get('/api/v1/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Welcome to Store Manager 1.0');
        done();
      });
  });
});
describe('Product routes', () => {
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
  describe('Create Product', () => {
    it('should create a product', (done) => {
      request
        .post('/api/v1/products')
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

describe('GET available products', () => {
  it('should get all available products', (done) => {
    request
      .get('/api/v1/products')
      .set('authorization', token)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.data).to.be.an('array');
        const products = res.body.data;
        products.forEach((product) => {
          expect(product).to.be.an('object');
          expect(product).to.haveOwnProperty('productname');
          expect(product).to.haveOwnProperty('id');
          expect(product).to.haveOwnProperty('category');
          expect(product).to.haveOwnProperty('price');
          expect(product).to.haveOwnProperty('description');
          expect(product).to.haveOwnProperty('image');
          expect(product).to.haveOwnProperty('minimumallowed');
          expect(product).to.haveOwnProperty('quantity');
        });
        done();
      });
  });
});

describe('GET single product', () => {
  it('should get a single products', (done) => {
    request
      .get(`/api/v1/products/${productId}`)
      .set('Content-Type', 'Application/json')
      .set('authorization', token)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});

describe('Update Product', () => {
  it('should update a product', (done) => {
    request
      .put(`/api/v1/products/${productId}`)
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

describe('POST Delete a product', () => {
  it('should be able to delete a product', (done) => {
    request
      .delete(`/api/v1/products/${productId}`)
      .set('authorization', token)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});

