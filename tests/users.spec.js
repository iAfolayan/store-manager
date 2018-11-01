import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../api/v1/app';

dotenv.config();

const request = supertest(app);

let token = '';

const dummyData = {
  staffid: 'SM005',
  title: 'Miss',
  password: 'admin',
  firstname: 'Grace',
  lastname: 'Festus',
  emailaddress: 'festus.grace@festus.com',
  phonenumber: '08032167911',
  role: 2,
  gender: 'Female',
  avatar: 'grace_festus.jpg',
  contactaddress: '656 wertyuiop[jfh g fuy fu',
};
const user = {
  staffid: 'SM001',
  password: 'admin'
};

describe('Login', () => {
  it('should login a user', (done) => {
    request
      .post('/api/v1/auth/login')
      .set('Content-Type', 'Application/json')
      .send(user)
      .end((err, res) => {
        token = res.body.data;
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Login successful');
        done();
      });
  });

  it('should return 400 if staffid is empty', (done) => {
    request
      .post('/api/v1/auth/login')
      .set('Content-Type', 'Application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.be.false;
        done();
      });
  });

  it('should return 400 if password is empty', (done) => {
    request
      .post('/api/v1/auth/login')
      .set('Content-Type', 'Application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.be.false;
        done();
      });
  });
  it('should return a message when passed an unregistered staffid', (done) => {
    request
      .post('/api/v1/auth/login')
      .accept('Content-Type', 'Application/json')
      .send({ staffid: 'WS001' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('msg');
        done();
      });
  });
});

describe('Create User', () => {
//  before((done) => {
//     // runs before all tests in this block
//     request
//       .post('/api/v1/auth/login')
//       .set('Content-Type', 'Application/json')
//       .send(user)
//       .end((err, res) => {
//         token = res.body.data;
//         done();
//       });
//   })

  it('should create a user', (done) => {
    request
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'Application/json')
      .set('authorization', token)
      .send(dummyData)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('should return a message when passed an invalid email', (done) => {
    request
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'Application/json')
      .set('authorization', token)
      .send({ ...dummyData, emailaddress: 'invalidEmail' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('msg');
        done();
      });
  });
});

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

// it('should return a message when passed an invalid email', (done) => {
//   request
//     .post('api/v1/resetpassword')
//     .accept('Content-Type', 'Application/json')
//     .send({ email: 'invalidEmail' })
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.body).to.be.an('object');
//       expect(res.body).to.have.property('message');
//       done();
//     });
// });

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
