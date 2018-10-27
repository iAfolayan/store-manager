import { expect } from 'chai';
import supertest from 'supertest';
import app from '../api/v1/app';

const request = supertest(app);
// let userId = null;
let token = null;

const dummyData = {
  staffId: 'SM005',
  title: 'Miss',
  password: 'admin',
  firstname: 'Grace',
  lastname: 'Festus',
  emailAdress: 'festus.grace@festus.com',
  phoneNumber: '08032167911',
  role: 2,
  gender: 'Female',
  passport: 'grace_festus.jpg',
  contactAddress: '41 Osholake street, Ebute-meta, Lagos',
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
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Login successful');
        expect(res.body.data).to.exist;
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
});

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
  }); 
  
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
