import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../api/v1/app';

dotenv.config();

const request = supertest(app);
const secret = process.env.SECRET;

let userId = null;

let token = null;

// const dummyData = {
//   staffId: 'SM005',
//   title: 'Miss',
//   password: 'admin',
//   firstname: 'Grace',
//   lastname: 'Festus',
//   emailAdress: 'festus.grace@festus.com',
//   phoneNumber: '08032167911',
//   role: 2,
//   gender: 'Female',
//   passport: 'grace_festus.jpg',
//   contactAddress: '41 Osholake street, Ebute-meta, Lagos',
// };
const user = {
  staffid: 'SM001',
  password: 'admin'
};

// describe('Login', () => {
//   it('should login a user', (done) => {
//     request
//       .post('/api/v1/auth/login')
//       .set('Content-Type', 'Application/json')
//       .send(user)
//       .end((err, res) => {
//         console.log(res.body);
//         token = res.body.data;
//         userId = res.body.data.id;
//         expect(res.status).to.equal(200);
//         expect(res.body.msg).to.equal('Login successful');
//         done();
//       });
//   });

  // it('should return 400 if staffid is empty', (done) => {
  //   request
  //     .post('/api/v1/auth/login')
  //     .set('Content-Type', 'Application/json')
  //     .send({})
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.be.false;
  //       done();
  //     });
  // });

  // it('should return 400 if password is empty', (done) => {
  //   request
  //     .post('/api/v1/auth/login')
  //     .set('Content-Type', 'Application/json')
  //     .send({})
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body.status).to.be.false;
  //       done();
  //     });
  // });
//});

/* describe('Create User', () => {
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
  })

  it('should create a user', (done) => {
    request
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'Application/json')
      .send(dummyData)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.msg).to.equal('New user successfully created');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
}); */

// describe('Password Reset > ', () => {
//   it('returns error message if password reset body is empty', (done) => {
//     request
//       .post('api/v1/resetpassword')
//       .accept('Content-Type', 'Application/json')
//       .send({ email: '' })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Email is required');
//         done();
//       });
//   });

//   it('should return a message when passed an invalid email', (done) => {
//     request
//       .post('api/v1/resetpassword')
//       .accept('Content-Type', 'Application/json')
//       .send({ email: 'invalidEmail' })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Provide your valid email');
//         done();
//       });
//   });

//   it('should return a message when passed an unregistered email', (done) => {
//     request
//       .post('api/v1/resetpassword')
//       .accept('Content-Type', 'Application/json')
//       .send({ email: 'tst@gmail.com' })
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('This email does not exist in our database');
//         done();
//       });
//   });
// });
