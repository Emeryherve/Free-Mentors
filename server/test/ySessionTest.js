
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import {
  REQUEST_SUCCEDED, RESOURCE_CREATED,
  BAD_REQUEST, FORBIDDEN, NOT_FOUND,
  REQUEST_CONFLICT,
  UNAUTHORIZED,
} from '../helpers/status_codes';

import sessions from '../models/fakerData/sessions';

import generateAuthToken from '../helpers/jtoken_generator';
import generateInvalidToken from '../helpers/invalid_token_gen';

const { expect } = chai;

chai.use(chaiHttp);

const tokenWithNoAdminAccess = generateAuthToken(1, false, false);
const nonToken = ' ';
const invalidToken = generateInvalidToken(1, true, false);
const mentorToken = generateAuthToken(2, false, true);
const mentorRejectToken = generateAuthToken(5, false, true);

describe('POST Create a mentorship session request with non integer mentorId, api/v2/sessions', () => {
  it('should return mentorId is not integer', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .send(sessions[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        done();
      });
  });
});

describe('POST Create a mentorship session request with whitespaced questions, api/v2/sessions', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .send(sessions[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        done();
      });
  });
});

describe('POST Create a mentorship session request api/v2/sessions', () => {
  it('should return mentorship session is created successfully', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .send(sessions[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(RESOURCE_CREATED);
        expect(res.body.status).to.equal(RESOURCE_CREATED);
        done();
      });
  });
});

describe('POST Create a mentorship session request with no mentorId, api/v2/sessions', () => {
  it('should return mentorId filed is required', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .send(sessions[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        done();
      });
  });
});
describe('POST Create a mentorship session request with no questions, api/v2/sessions', () => {
  it('should return questions field is required', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .send(sessions[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        done();
      });
  });
});

describe('PATCH accept a mentorship session request with no token api/v2/sessions/:sessionId/accept', () => {
  it('should return no token found', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/accept')
      .set('x-auth-token', nonToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(UNAUTHORIZED);
        expect(res.body.status).to.equal(UNAUTHORIZED);
        expect(res.body.error).to.equal('Access denied. No token provided');
        done();
      });
  });
});

describe('PATCH accept a mentorship session request with not mentor token api/v2/sessions/:sessionId/accept', () => {
  it('should return you are not a mentor', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/accept')
      .set('x-auth-token', tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(FORBIDDEN);
        expect(res.body.status).to.equal(FORBIDDEN);
        expect(res.body.error).to.equal('Oops!, you are not allowed to perform this action, Please You must be a mentor to do so!.');
        done();
      });
  });
});

describe('PATCH accept a mentorship session request with invalid token api/v2/sessions/:sessionId/accept', () => {
  it('should return invalid token', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/accept')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('invalid signature');
        done();
      });
  });
});

describe('PATCH accept a mentorship session request: session id not exist api/v2/sessions/:sessionId/accept', () => {
  it('should return session id not found', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/900/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body.status).to.equal(NOT_FOUND);
        expect(res.body.error).to.equal('The session with 900 id is not found!.');
        done();
      });
  });
});

describe('PATCH accept a mentorship session request: Rejected session api/v2/sessions/:sessionId/accept', () => {
  it('should return session is already rejected', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/3/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(FORBIDDEN);
        expect(res.body.status).to.equal(FORBIDDEN);
        expect(res.body.error).to.equal('OOps! You can not accept the rejected session request!');
        done();
      });
  });
});

describe('PATCH accept a mentorship session request: Accepted session api/v2/sessions/:sessionId/accept', () => {
  it('should return session is already accepted', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/2/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_CONFLICT);
        expect(res.body.status).to.equal(REQUEST_CONFLICT);
        expect(res.body.error).to.equal(`This Session Request with ${sessions[1].sessionId} id is already accepted!`);
        done();
      });
  });
});

describe('PATCH accept a mentorship session request api/v2/sessions/:sessionId/accept', () => {
  it('should return accepted status', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/1/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.data.status).to.equal('accepted');
        done();
      });
  });
});

describe('PATCH api/v2/sessions/:sessionId/accept not owner of session', () => {
  it('should return you are not the owner of session request', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(UNAUTHORIZED);
        expect(res.body.status).to.equal(UNAUTHORIZED);
        expect(res.body.error).to.equal('You are not the owner of this session request!');
        done();
      });
  });
});

describe('PATCH api/v2/sessions/:sessionId/reject not owner of session', () => {
  it('should return you are not the owner of session request', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(UNAUTHORIZED);
        expect(res.body.status).to.equal(UNAUTHORIZED);
        expect(res.body.error).to.equal('You are not the owner of this session request!');
        done();
      });
  });
});

describe('PATCH reject a mentorship session request with no token api/v2/sessions/:sessionId/reject', () => {
  it('should return no token found', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/reject')
      .set('x-auth-token', nonToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(UNAUTHORIZED);
        expect(res.body.status).to.equal(UNAUTHORIZED);
        expect(res.body.error).to.equal('Access denied. No token provided');
        done();
      });
  });
});

describe('PATCH reject a mentorship session request with not mentor token api/v2/sessions/:sessionId/reject', () => {
  it('should return you are not a mentor', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/reject')
      .set('x-auth-token', tokenWithNoAdminAccess)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(FORBIDDEN);
        expect(res.body.status).to.equal(FORBIDDEN);
        expect(res.body.error).to.equal('Oops!, you are not allowed to perform this action, Please You must be a mentor to do so!.');
        done();
      });
  });
});

describe('PATCH reject a mentorship session request with invalid token api/v2/sessions/:sessionId/reject', () => {
  it('should return invalid token', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/reject')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('invalid signature');
        done();
      });
  });
});

describe('PATCH reject a mentorship session request: session id not exist api/v2/sessions/:sessionId/reject', () => {
  it('should return session id not found', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/900/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body.status).to.equal(NOT_FOUND);
        expect(res.body.error).to.equal('The session with 900 id is not found!.');
        done();
      });
  });
});

describe('PATCH reject a mentorship session request: Rejected session api/v2/sessions/:sessionId/reject', () => {
  it('should not reject the session', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/2/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(FORBIDDEN);
        expect(res.body.status).to.equal(FORBIDDEN);
        expect(res.body.error).to.equal('OOps! You can not reject the accepted Session Request!');
        done();
      });
  });
});

describe('PATCH reject a mentorship session request: rejected session api/v2/sessions/:sessionId/reject', () => {
  it('should return session is already rejected', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/3/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_CONFLICT);
        expect(res.body.status).to.equal(REQUEST_CONFLICT);
        expect(res.body.error).to.equal(`This Session Request with ${sessions[2].sessionId} id is already rejected!`);
        done();
      });
  });
});

describe('PATCH reject a mentorship session request api/v2/sessions/:sessionId/reject', () => {
  it('should return rejected status', (done) => {
    chai.request(app)
      .patch('/api/v2/sessions/4/reject')
      .set('x-auth-token', mentorRejectToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.data.status).to.equal('rejected');
        done();
      });
  });
});
