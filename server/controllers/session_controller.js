import Session from '../models/session_model';
import StatusCode from '../helpers/status_codes';
import Validator from '../helpers/validator';
import SessionBridge from '../helpers/sessionBridge';

class SessionController {
    createSessionRequest = (req, res) => {
      const result = Validator.validateMentorShipRequest(req.body);
      if (result.error == null) {
        const { mentorId } = req.body;
        if (isNaN(mentorId)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'Mentor id should be an integer' });
        }
        if (!Validator.validData(req.body.questions)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'questions can\'t be empty' });
        }
        const session = Session.create(req.body, req.header('x-auth-token'), res);
        return res.status(StatusCode.RESOURCE_CREATED).send(session);
      }
      return res.status(StatusCode.BAD_REQUEST).send({
        status: StatusCode.BAD_REQUEST,
        error: `${result.error.details[0].message}`,
      });
    };

    acceptRequest = (req, res) => {
      const { sessionId } = req.params;
      const response1 = SessionBridge.haltIfNoSessionFound(sessionId, Session);
      if (response1) {
        return res.status(StatusCode.NOT_FOUND).send({
          status: StatusCode.NOT_FOUND,
          error: response1,
        });
      }
      const response2 = SessionBridge.haltIfSessionRejected(sessionId, Session, 'accept');
      if (response2) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: StatusCode.FORBIDDEN,
          error: response2,
        });
      }
      const response3 = SessionBridge.haltIfSessionAccepted(sessionId, Session, 'accept');
      if (response3) {
        return res.status(StatusCode.REQUEST_CONFLICT).send({
          status: StatusCode.REQUEST_CONFLICT,
          error: response3,
        });
      }
      const result = Session.accept(req.params);
      return res.status(StatusCode.REQUEST_SUCCEDED).send({
        status: StatusCode.REQUEST_SUCCEDED,
        data: result,
      });
    };

    rejectRequest = (req, res) => {
      const { sessionId } = req.params;
      const response1 = SessionBridge.haltIfNoSessionFound(sessionId, Session);
      if (response1) {
        return res.status(StatusCode.NOT_FOUND).send({
          status: StatusCode.NOT_FOUND,
          error: response1,
        });
      }

      const response2 = SessionBridge.haltIfSessionAccepted(sessionId, Session, 'reject');
      if (response2) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: StatusCode.FORBIDDEN,
          error: response2,
        });
      }
      const response3 = SessionBridge.haltIfSessionRejected(sessionId, Session, 'reject');
      if (response3) {
        return res.status(StatusCode.REQUEST_CONFLICT).send({
          status: StatusCode.REQUEST_CONFLICT,
          error: response3,
        });
      }
      const result = Session.reject(req.params);
      return res.status(StatusCode.REQUEST_SUCCEDED).send({
        status: StatusCode.REQUEST_SUCCEDED,
        data: result,
      });
    };
}

export default SessionController;
