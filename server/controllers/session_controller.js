import Model from '../models/dbQuery';
import {
  REQUEST_SUCCEDED, RESOURCE_CREATED,
  BAD_REQUEST, FORBIDDEN, NOT_FOUND,
  REQUEST_CONFLICT, SERVER_ERROR, UNAUTHORIZED,
} from '../helpers/status_codes';
import Validator from '../helpers/validator';
import SessionBridge from '../helpers/sessionBridge';
import getMenteeIdInToken from '../helpers/mentee_id_decoder';

class SessionController {
  static model() {
    return new Model('sessions');
  }

  static userModel() {
    return new Model('users');
  }

    static createSessionRequest = async (req, res) => {
      try {
        const result = Validator.validateMentorShipRequest(req.body);
        if (result.error == null) {
          const {
            mentorId, questions,
          } = req.body;
          const token = req.header('x-auth-token');
          if (isNaN(mentorId)) {
            return res.status(BAD_REQUEST).send({
              status: BAD_REQUEST,
              error: 'Mentor id should be an integer',
            });
          }
          if (!Validator.validData(questions)) {
            return res.status(BAD_REQUEST).send({
              status: BAD_REQUEST,
              error: 'questions can\'t be empty',
            });
          }
          const menteeId = getMenteeIdInToken(token, res);
          const user = await this.userModel().select('*', 'id=$1', [menteeId]);
          const menteeEmail = user[0].email;
          const cols = 'mentor_id, mentee_id, mentee_email,questions, status';
          const sels = `'${mentorId}', '${menteeId}', '${menteeEmail}', '${questions}',
        'pending'`;
          const rows = await this.model().insert(cols, sels);
          return res.status(RESOURCE_CREATED).send({
            status: RESOURCE_CREATED,
            data: rows[0],
          });
        }
        return res.status(BAD_REQUEST).send({
          status: BAD_REQUEST,
          error: `${result.error.details[0].message}`,
        });
      } catch (e) {
        return res.status(SERVER_ERROR).json({
          status: SERVER_ERROR,
          error: 'server error',
        });
      }
    };

    static acceptRequest = async (req, res) => {
      try {
        const { sessionId } = req.params;
        const token = req.header('x-auth-token');
        const session = await this.model().select('*', 'id=$1', [sessionId]);
        const response1 = SessionBridge.haltIfNoSessionFound(session, sessionId);
        if (response1) {
          return res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            error: response1,
          });
        }

        const response2 = SessionBridge.haltIfSessionRejected(session, 'accept');
        if (response2) {
          return res.status(FORBIDDEN).send({
            status: FORBIDDEN,
            error: response2,
          });
        }
        const response3 = SessionBridge.haltIfSessionAccepted(session, 'accept');
        if (response3) {
          return res.status(REQUEST_CONFLICT).send({
            status: REQUEST_CONFLICT,
            error: response3,
          });
        }
        const mentorId = getMenteeIdInToken(token, res);
        const response4 = SessionBridge.haltIfNotOwnerOfSession(mentorId, session);
        if (response4) {
          return res.status(UNAUTHORIZED).send({
            status: UNAUTHORIZED,
            error: response4,
          });
        }
        const acceptedSession = await this.model().update('status=$1', 'id=$2', ['accepted', sessionId]);
        if (acceptedSession) {
          let response = {
            sessionId: session[0].id,
            mentorId: session[0].mentor_id,
            menteeId: session[0].mentee_id,
            questions: session[0].questions,
            menteeEmail: session[0].menteeEmail,
            status: 'accepted',
          };
          return res.status(REQUEST_SUCCEDED).send({
            status: REQUEST_SUCCEDED,
            data: response,
          });
        }
      } catch (e) {
        console.log(e);
        return res.status(SERVER_ERROR).json({
          status: SERVER_ERROR,
          error: 'server error',
        });
      }
    };

    static rejectRequest = async (req, res) => {
      try {
        const { sessionId } = req.params;
        const token = req.header('x-auth-token');
        const session = await this.model().select('*', 'id=$1', [sessionId]);
        const response1 = SessionBridge.haltIfNoSessionFound(session, sessionId);
        if (response1) {
          return res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            error: response1,
          });
        }

        const response2 = SessionBridge.haltIfSessionAccepted(session, 'reject');
        if (response2) {
          return res.status(FORBIDDEN).send({
            status: FORBIDDEN,
            error: response2,
          });
        }
        const response3 = SessionBridge.haltIfSessionRejected(session, 'reject');
        if (response3) {
          return res.status(REQUEST_CONFLICT).send({
            status: REQUEST_CONFLICT,
            error: response3,
          });
        }
        const mentorId = getMenteeIdInToken(token, res);
        const response4 = SessionBridge.haltIfNotOwnerOfSession(mentorId, session);
        if (response4) {
          return res.status(UNAUTHORIZED).send({
            status: UNAUTHORIZED,
            error: response4,
          });
        }
        const rejectedSession = await this.model().update('status=$1', 'id=$2', ['rejected', sessionId]);
        if (rejectedSession) {
          let response = {
            sessionId: session[0].id,
            mentorId: session[0].mentor_id,
            menteeId: session[0].mentee_id,
            questions: session[0].questions,
            menteeEmail: session[0].menteeEmail,
            status: 'rejected',
          };
          return res.status(REQUEST_SUCCEDED).send({
            status: REQUEST_SUCCEDED,
            data: response,
          });
        }
      } catch (e) {
        return res.status(SERVER_ERROR).json({
          status: SERVER_ERROR,
          error: 'server error',
        });
      }
    };
}

export default SessionController;
