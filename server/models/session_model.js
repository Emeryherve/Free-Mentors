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
        questions: 'Just for test',
        menteeEmail: 'herve2@gmail.com',
        status: 'pending',
      },
      {
        sessionId: 2,
        mentorId: 4,
        menteeId: 2,
        questions: 'Just for test',
        menteeEmail: 'herve4@gmail.com',
        status: 'accepted',
      },
      {
        sessionId: 3,
        mentorId: 5,
        menteeId: 3,
        questions: 'Just for test',
        menteeEmail: 'herve5@gmail.com',
        status: 'rejected',
      },
      {
        sessionId: 4,
        mentorId: 5,
        menteeId: 3,
        questions: 'Just for test',
        menteeEmail: 'herve5@gmail.com',
        status: 'pending',
      },
    ];
  }

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

    isSessionExist = sId => this.sessions.find(s => s.sessionId === parseInt(sId, 10));

    accept = ({ sessionId }) => {
      const sessionForAccept = this.isSessionExist(sessionId);
      sessionForAccept.status = 'accepted';
      return sessionForAccept;
    };

    isAlreadyAccepted = (sessionId) => {
      if (this.isSessionExist(sessionId).status === 'accepted') {
        return true;
      }
      return false;
    };

    reject = ({ sessionId }) => {
      const sessionForReject = this.isSessionExist(sessionId);
      sessionForReject.status = 'rejected';
      return sessionForReject;
    };

    isAlreadyRejected = (sessionId) => {
      if (this.isSessionExist(sessionId).status === 'rejected') {
        return true;
      }
      return false;
    };
}

export default new Session();
