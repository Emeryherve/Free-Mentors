import User from './user_model';
import getMenteeIdInToken from '../helpers/mentee_id_decoder';
import StatusCode from '../helpers/status_codes';

class Session {
  constructor() {
    this.sessions = [
      {
        sessionId: 1,
        mentorId: 2,
        menteeId: 1,
        questions:'Just for test',
        menteeEmail:'herve2@gmail.com',
        status: 'pending',
       },
       {
        sessionId: 2,
        mentorId: 4,
        menteeId: 2,
        questions:'Just for test',
        menteeEmail:'herve4@gmail.com',
        status: 'accepted',
       },
       {
        sessionId: 3,
        mentorId: 5,
        menteeId: 3,
        questions:'Just for test',
        menteeEmail:'herve5@gmail.com',
        status: 'rejected',
       },
       {
        sessionId: 4,
        mentorId: 5,
        menteeId: 3,
        questions:'Just for test',
        menteeEmail:'herve5@gmail.com',
        status: 'pending',
       },
    ];
  }

  // Tempolary keep mentorship request in memory
    create = (payload, token, res) => {
      const {
        mentorId, questions,
      } = payload;
      const currentId = this.sessions.length + 1;
      const menteeId = getMenteeIdInToken(token, res);
      const menteeEmail = User.getMenteeEmailById(menteeId);
      let newSession = {
        sessionId: currentId,
        mentorId,
        menteeId,
        questions,
        menteeEmail,
        status: 'pending',
      };
      this.sessions.push(newSession);
      newSession = {
        status: StatusCode.RESOURCE_CREATED,
        data: newSession,
      };

      return newSession;
    };

    // mentorship request availability checker
    isSessionExist = sId => this.sessions.find(s => s.sessionId === parseInt(sId));

    // Aprove mentorship rquest
    accept = ({ sessionId }) => {
      const session = this.isSessionExist(sessionId);
      session.status = 'accepted';
      return session;
    };

    // mentorship request status checker
    isAlreadyAccepted = (sessionId) => {
      const session = this.isSessionExist(sessionId);
      if (session.status === 'accepted') {
        return true;
      }
      return false;
    };

    // Disapprove mentorship request
    reject = ({ sessionId }) => {
      const session = this.isSessionExist(sessionId);
      session.status = 'rejected';
      return session;
    };

    // mentorship request status checker
    isAlreadyRejected = (sessionId) => {
      const session = this.isSessionExist(sessionId);
      if (session.status === 'rejected') {
        return true;
      }
      return false;
    };
}

export default new Session();
