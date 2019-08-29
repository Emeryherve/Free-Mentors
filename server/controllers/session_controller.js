import Session from '../models/session_model';
import StatusCode from '../helpers/status_codes';
import Validator from '../helpers/validator';

class SessionController {
  // Establish menotship request btn mentor and mentee
    createSessionRequest = (req, res) => {
      const result = Validator.validateMentorShipRequest(req.body);
      if (result.error == null) {
        const session = Session.create(req.body, req.header('x-auth-token'), res);
        return res.status(StatusCode.RESOURCE_CREATED).send(session);
      }
      return res.status(StatusCode.BAD_REQUEST).send({
        status: StatusCode.BAD_REQUEST,
        error: `${result.error.details[0].message}`,
      });
    };

    // Approving mentorship request
    acceptRequest = (req, res) => {
      // Validation
      // 1. Does sessionId exists
      // 2. Is Session rejected
      // 3. Is already Session accepted
      // 4. Is it a pending session

      // finally, accept session Request
      const { sessionId } = req.params;
      if (!Session.isSessionExist(sessionId)) {
        return res.status(StatusCode.NOT_FOUND).send({
          status: 'error',
          error: `The session with ${sessionId} id is not found!.`,
        });
      }
      if (Session.isAlreadyRejected(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: 'error',
          error: 'OOps! You can not accept the rejected session request!',
        });
      }
      if (Session.isAlreadyAccepted(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: 'error',
          error: `This Session Request with ${sessionId} id is already accepted!`,
        });
      }
      if (!Session.isPendingSession(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: 'error',
          error: 'OOps! a mentorship session request is not properly initialized by a mentee!',
        });
      }
      const result = Session.accept(req.params);
      return res.status(StatusCode.REQUEST_SUCCEDED).send({
        status: StatusCode.REQUEST_SUCCEDED,
        data: result,
      });
    };

    // Disapproving mentorship request
    rejectRequest = (req, res) => {
      // Validation
      // 1. Does sessionId exists
      // 2. Is a session Accepted
      // 3. Is already session  rejected
      // 4. Is it a pending session

      // Finally Reject session Request
      const { sessionId } = req.params;
      if (!Session.isSessionExist(sessionId)) {
        return res.status(StatusCode.NOT_FOUND).send({
          status: 'error',
          error: `The session with ${sessionId} id is not found!.`,
        });
      }
      if (Session.isAlreadyAccepted(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: 'error',
          error: ' OOps! You can not reject the accepted Session Request!',
        });
      }
      if (Session.isAlreadyRejected(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: 'error',
          error: `This Session Request with ${sessionId} id is already rejected!`,
        });
      }
      if (!Session.isPendingSession(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: 'error',
          error: 'OOps! a mentorship session request is not properly initialized by a mentee!',
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
