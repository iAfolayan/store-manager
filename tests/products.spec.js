import { expect } from 'chai';
import supertest from 'supertest';
import app from '../api/v1/app';

const request = supertest(app);
let productId = 'wryheth';
let token = '';

const dummyData = {
  productname: 'test name',
  category: 'phone',
  description: 'test product',
  minimumallowed: 200,
  quantity: 10,
  price: '4000',
  image: 'tet.png'
};

const user = {
  staffid: 'SM001',
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
          expect(res.body.msg).to.equal('A new product was successfully created');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });
});
// describe('GET available products', () => {
//   it('should get all available products', (done) => {
//     request
//       .get('/api/v1/products')
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body).to.haveOwnProperty('data');
//         expect(res.body.data).to.be.an('array');
//         expect(res.body.data.length).to.equal(3);
//         const products = res.body.data;
//         productId = products[0].id;
//         products.forEach((product) => {
//           expect(product).to.be.an('object');
//           expect(product).to.haveOwnProperty('name');
//           expect(product).to.haveOwnProperty('id');
//           expect(product).to.haveOwnProperty('category');
//           expect(product).to.haveOwnProperty('price');
//           expect(product).to.haveOwnProperty('description');
//           expect(product).to.haveOwnProperty('image');
//           expect(product).to.haveOwnProperty('minimumAllowed');
//         });
//         done();
//       });
//   });
// });

// it('returns error message when product id is invalid', (done) => {
//   request
//     .get(`api/v1/products/${productId}`)
//     .set('authorization', token)
//     .set('Content-Type', 'Application/json')
//     .end((err, res) => {
//       console.log(res)
//       expect(res.status).to.equal(400);
//       expect(res.body).to.be.an('object');
//       expect(res.body.msg).to
//         .equal('Invalid Parameter: use integer parameters!');
//       done();
//     });
// });

// describe('GET single product', () => {
//   it('should get a single products', (done) => {
//     request
//       .get(`/api/v1/products/${productId}`)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body).to.haveOwnProperty('data');
//         expect(res.body.data).to.be.an('object');
//         done();
//       });
//   });
// });

// describe('POST Delete a product', () => {
//   it('should be able to delete a product', (done) => {
//     request
//       .delete(`/api/v1/products/${productId}`)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body).to.haveOwnProperty('data');
//         expect(res.body.data).to.be.an('object');
//         done();
//       });
//   });
// });


// describe('Update Product', () => {
//   it('should update a product', (done) => {
//     request
//       .put(`/api/v1/products/${productId}`)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body).to.haveOwnProperty('data');
//         expect(res.body.data).to.be.an('object');
//         done();
//       });
//   });
// });
