import User from '../models/user_model';
import StatusCode from '../helpers/status_codes';
import Validator from '../helpers/validator';

class UserController {
    signUp = (req, res) => {
      const result = Validator.validateSignUpRequest(req.body);
      if (result.error == null) {
        if (User.isEmailTaken(req.body.email)) {
          return res.status(StatusCode.REQUEST_CONFLICT).send({
            status: StatusCode.REQUEST_CONFLICT,
            error: `${req.body.email} is already taken!, Give it another try different email.`,
          });
        }
        if (!Validator.validData(req.body.firstName)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'firstName can\'t be empty' });
        }
        if (!Validator.validData(req.body.lastName)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'LastName can\'t be empty' });
        }
        if (!Validator.validData(req.body.password)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'password can\'t be empty' });
        }
        const user = User.create(req.body);
        return res.status(StatusCode.RESOURCE_CREATED).send(user);
      }
      return res.status(StatusCode.BAD_REQUEST).send({
        status: StatusCode.BAD_REQUEST,
        error: `${result.error.details[0].message}`,
      });
    };

    signIn = (req, res) => {
      const result = Validator.validateSignInRequest(req.body);
      if (result.error == null) {
        const user = User.login(req.body);
        if (user.status === StatusCode.REQUEST_SUCCEDED) {
          res.set('x-auth-token', user.data.token);
          return res.status(StatusCode.REQUEST_SUCCEDED).send(user);
        }
        return res.status(StatusCode.UNAUTHORIZED).send(user);
      }
      return res.status(StatusCode.BAD_REQUEST).send({
        status: StatusCode.BAD_REQUEST,
        error: `${result.error.details[0].message}`,
      });
    };

    changeUserToMentor = (req, res) => {
      const { userId } = req.params;
      if (isNaN(userId.trim())) {
        return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'User id should be an integer' });
      }
      if (!User.isUserExist(userId)) {
        return res.status(StatusCode.NOT_FOUND).send({
          status: StatusCode.NOT_FOUND,
          error: `The user with ${userId} id is not found!.`,
        });
      }
      if (User.isAlreadyAmentor(userId)) {
        return res.status(StatusCode.FORBIDDEN).send({

          status: StatusCode.FORBIDDEN,

          error: `The user with ${userId} id is already a mentor!.`,
        });
      }
      if (User.isChangedToMentor(userId)) {
        return res.status(StatusCode.REQUEST_SUCCEDED).send({
          status: StatusCode.REQUEST_SUCCEDED,
          message: 'User account changed to mentor',
        });
      }
    };

    getMentors = (req, res) => {
      const mentors = User.getAll();
      return res.status(StatusCode.REQUEST_SUCCEDED).send({
        status: StatusCode.REQUEST_SUCCEDED,
        data: mentors,
      });
    };

    getMentorById = (req, res) => {
      const { mentorId } = req.params;
      if (!User.isUserExist(mentorId)) {
        return res.status(StatusCode.NOT_FOUND).send({
          status: StatusCode.NOT_FOUND,
          error: `The user with ${mentorId} id is not found!.`,
        });
      }

      const mentor = User.getMentor(mentorId);
      return res.status(StatusCode.REQUEST_SUCCEDED).send({
        status: StatusCode.REQUEST_SUCCEDED,
        data: mentor,
      });
    };
}

export default UserController;
