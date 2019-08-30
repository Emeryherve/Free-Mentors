
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import status from '../helpers/status_codes';

import users from '../models/fakerData/users';

import generateAuthToken from '../helpers/jtoken_generator';
import generateInvalidToken from '../helpers/invalid_token_gen';

const { expect } = chai;

chai.use(chaiHttp);
// incorrect Id for testing 
const invalidUserId = 0;
// Already mentor user
const {id} = users[13];
const notMentorId = users[14];
// Token with invalid user
const tokenWithInvalidUser = generateAuthToken(0,true,false);
// Token with no admin access right
const tokenWithNoAdminAccess = generateAuthToken(1,false,false);
// Token with Admin access
const tokenWithAdminAccess = generateAuthToken(1,true,false);
//No token provided
const nonToken = ' ';
//Invalid signature token
const invalidToken = generateInvalidToken(1,true,false);

// Let's first grab the faked user info
const {
  email,
  firstName,
  lastName,
  address,
  bio,
  occupation,
  expertise,
} = users[0];

// ############ SIGNUP TEST ############

// Test signup for the user
describe('POST sign up with whitespaced firstName, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST sign up with whitespaced lastNname, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
describe('POST sign up with whitespaced password, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[12])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
describe('POST sign up successfully, api/v1/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.RESOURCE_CREATED);
        expect(res.body.status).to.equal(status.RESOURCE_CREATED);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.firstName).to.equal(firstName);
        expect(res.body.data.lastName).to.equal(lastName);
        expect(res.body.data.email).to.equal(email);
        expect(res.body.data.address).to.equal(address);
        expect(res.body.data.bio).to.equal(bio);
        expect(res.body.data.occupation).to.equal(occupation);
        expect(res.body.data.expertise).to.equal(expertise);
        done();
      });
  });
});
// Test for email existance
describe('POST email already exist, api/v1/auth/signup', () => {
  it('should return {email} already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(status.REQUEST_CONFLICT);
        expect(res.body.error).to.equal(`${email} is already taken!, Give it another try different email.`);
        done();
      });
  });
});

// Test for short password
describe('POST sign up with short password api/v1/auth/signup', () => {
  it('should return error when user entered short password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"password" length must be at least 8 characters long');
        done();
      });
  });
});

// Test for user data incompleteness
describe('POST sign up with incomplete data api/v1/auth/signup', () => {
  it('should return error when user signup details is incomplete', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"expertise" is required');
        done();
      });
  });
});

// Test for email validation
describe('POST sign up with invalid email api/v1/auth/signup', () => {
  it('should return error when user email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" is required');
        done();
      });
  });
});

// ############ SIGNin TEST ############

// Test for signin successful
describe('POST signin successfully, api/v1/auth/signin', () => {
  it('should return signin successfullty status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.firstName).to.equal(firstName);
        expect(res.body.data.lastName).to.equal(lastName);
        expect(res.body.data.email).to.equal(email);
        expect(res.body.data.address).to.equal(address);
        expect(res.body.data.bio).to.equal(bio);
        expect(res.body.data.occupation).to.equal(occupation);
        expect(res.body.message).to.equal('User is successfully logged in');
        done();
      });
  });
});

// Test for credential incorrectness
describe('POST signin failed, api/v1/auth/signin', () => {
  it('should return signin error status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('email or password is incorrect!');
        done();
      });
  });
});

// Test for email missing
describe('POST signin with incomplete data, api/v1/auth/signin', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" is required');
        done();
      });
  });
});

// Test for password missing
describe('POST signin with incomplete data, api/v1/auth/signin', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"password" is required');
        done();
      });
  });
});

// Test for sigin email validation
describe('POST signin with invalid email, api/v1/auth/signin', () => {
  it('should return email must be valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" must be a valid email');
        done();
      });
  });
});

// ########## Mentor(api/v1/user) Test ###########

describe('PATCH Change a user to a mentor(api/v1/user) with an id not an integer', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .patch('/api/v1/user/k')
      .set('x-auth-token', tokenWithAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('User id should be an integer');
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('PATCH Change a user to a mentor(api/v1/user) with an id not found', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .patch('/api/v1/user/0')
      .set('x-auth-token', tokenWithAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal(`The user with ${invalidUserId} id is not found!.`);
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});

describe('PATCH Change a user to a mentor(api/v1/user) user is already mentor', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .patch('/api/v1/user/2')
      .set('x-auth-token', tokenWithAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.FORBIDDEN);
        expect(res.body.error).to.equal(`The user with ${id} id is already a mentor!.`);
        expect(res.status).to.equal(status.FORBIDDEN);
        done();
      });
  });
});

describe('PATCH Change a user to a mentor(api/v1/user)', () => {
  it('should return user is changed to mentor successfully', (done) => {
    chai.request(app)
      .patch('/api/v1/user/3')
      .set('x-auth-token',tokenWithAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.message).to.equal('User account changed to mentor');
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});

describe('PATCH Change a user to a mentor with token of invalid id(api/v1/user)', () => {
  it('should return token has no matching user', (done) => {
    chai.request(app)
      .patch('/api/v1/user/3')
      .set('x-auth-token',tokenWithInvalidUser)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal(`The User associated with this token of ${invalidUserId} id was banned or deleted!.`);
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});


describe('PATCH Change a user to a mentor With No token provided (api/v1/user)', () => {
  it('should return no token provided ', (done) => {
    chai.request(app)
      .patch('/api/v1/user/3')
      .set('x-auth-token',nonToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('Access denied. No token provided');
        expect(res.status).to.equal(status.UNAUTHORIZED);
        done();
      });
  });
});

describe('PATCH Change a user to a mentor With Invalid JWT token (api/v1/user)', () => {
  it('should return invalid JWT token ', (done) => {
    chai.request(app)
      .patch('/api/v1/user/3')
      .set('x-auth-token',invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('invalid signature');
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('PATCH Change a user to a mentor With token of no Admin access (api/v1/user)', () => {
  it('should return user has no admin access to change user ', (done) => {
    chai.request(app)
      .patch('/api/v1/user/3')
      .set('x-auth-token',tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.FORBIDDEN);
        expect(res.body.error).to.equal('Oops!, you are not allowed to perform this action, Please You must be an admin to do so!.');
        expect(res.status).to.equal(status.FORBIDDEN);
        done();
      });
  });
});

// ########## Mentor(/mentors) Test ###########
describe('GET Get all mentors (api/v1/mentors)', () => {
  it('should return all mentors available ', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('x-auth-token',tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});

describe('GET get all mentors With No token provided (api/v1/mentors)', () => {
  it('should return no token provided ', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('x-auth-token',nonToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('Access denied. No token provided');
        expect(res.status).to.equal(status.UNAUTHORIZED);
        done();
      });
  });
});

// ########## Mentor(/mentors/:mentorId) Test ###########

describe('GET a specific mentor(api/v1/mentors/:mentorId) with an id not found', () => {
  it('should return mentor id not exist', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/0')
      .set('x-auth-token', tokenWithAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal(`The user with ${invalidUserId} id is not found!.`);
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});

describe('GET a specific mentor (api/v1/mentors)', () => {
  it('should return a mentor ', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/2')
      .set('x-auth-token',tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});

