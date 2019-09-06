import Session from '../models/session_model';
import StatusCode from '../helpers/status_codes';
import Validator from '../helpers/validator';

class SessionController {
  // Establish menotship request btn mentor and mentee
    createSessionRequest = (req, res) => {
      const result = Validator.validateMentorShipRequest(req.body);
      if (result.error == null) {

        const {mentorId} = req.body;
         // Validation 
         // 1. Allow integer for mentorId
        if (isNaN(mentorId)) {
        return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'Mentor id should be an integer' });
          }
          // 2. questions can not be empty
         if (!Validator.validData(req.body.questions)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'questions can\'t be empty' });
        }
        // Go ahead and create session

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

          status: StatusCode.NOT_FOUND,

          error: `The session with ${sessionId} id is not found!.`,
        });
      }
      if (Session.isAlreadyRejected(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({

          status: StatusCode.FORBIDDEN,

          error: 'OOps! You can not accept the rejected session request!',
        });
      }
      if (Session.isAlreadyAccepted(sessionId)) {
        return res.status(StatusCode.REQUEST_CONFLICT).send({

          status: StatusCode.REQUEST_CONFLICT,
          error: `This Session Request with ${sessionId} id is already accepted!`,
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

          status: StatusCode.NOT_FOUND,

          error: `The session with ${sessionId} id is not found!.`,
        });
      }
      if (Session.isAlreadyAccepted(sessionId)) {
        return res.status(StatusCode.FORBIDDEN).send({

          status: StatusCode.FORBIDDEN,
          error: 'OOps! You can not reject the accepted Session Request!',

        });
      }
      if (Session.isAlreadyRejected(sessionId)) {
        return res.status(StatusCode.REQUEST_CONFLICT).send({

          status: StatusCode.REQUEST_CONFLICT,
          error: `This Session Request with ${sessionId} id is already rejected!`,
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
