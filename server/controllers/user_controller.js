import User from '../models/user_model';
import StatusCode from '../helpers/status_codes';
import Validator from '../helpers/validator';

class UserController {
  // SignUP
    signUp = (req, res) => {
      const result = Validator.validateSignUpRequest(req.body);
      if (result.error == null) {
        if (User.isEmailTaken(req.body.email)) {
          // 409 = Conflict due to existing email
          return res.status(StatusCode.REQUEST_CONFLICT).send({
            status: StatusCode.REQUEST_CONFLICT,
            error: `${req.body.email} is already taken!, Give it another try different email.`,
          });
        }
        // Validation for empty fields
        if (!Validator.validData(req.body.firstName)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'firstName can\'t be empty' });
        }
        if (!Validator.validData(req.body.lastName)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'LastName can\'t be empty' });
        }
        if (!Validator.validData(req.body.password)) {
          return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'password can\'t be empty' });
        }

        // Everything is okay
        // We fire up User model to create user
        const user = User.create(req.body);
        return res.status(StatusCode.RESOURCE_CREATED).send(user);
      }
      // Request does not fullfill requirements
      return res.status(StatusCode.BAD_REQUEST).send({
        status: StatusCode.BAD_REQUEST,
        error: `${result.error.details[0].message}`,
      });
    };

    // Login in
    signIn = (req, res) => {
      const result = Validator.validateSignInRequest(req.body);
      if (result.error == null) {
        // Everything is okay
        // We fire up User model to login user
        const user = User.login(req.body);
        if (user.status === StatusCode.REQUEST_SUCCEDED) {
          res.set('x-auth-token', user.data.token);
          return res.status(StatusCode.REQUEST_SUCCEDED).send(user);
        }
        // Credentials do not match
        return res.status(StatusCode.UNAUTHORIZED).send(user);
      }
      // Request does not fullfill
      return res.status(StatusCode.BAD_REQUEST).send({
        status: StatusCode.BAD_REQUEST,
        error: `${result.error.details[0].message}`,
      });
    };

    changeUserToMentor = (req, res) => {
      const { userId } = req.params;
      // Validation:
      // 0. Allow Integer id
      if (isNaN(userId.trim())) {
        return res.status(StatusCode.BAD_REQUEST).send({ status: StatusCode.BAD_REQUEST, error: 'User id should be an integer' });
      }
      // 1. Check if userId exists
      if (!User.isUserExist(userId)) {
        return res.status(StatusCode.NOT_FOUND).send({
          status: StatusCode.NOT_FOUND,
          error: `The user with ${userId} id is not found!.`,
        });
      }
      // 2. Check if is not already changed to a mentor
      if (User.isAlreadyAmentor(userId)) {
        return res.status(StatusCode.FORBIDDEN).send({
          status: StatusCode.FORBIDDEN,
          error: `The user with ${userId} id is already a mentor!.`,
        });
      }
      // 3. Change specific :userId to mentor and notify admin
      if (User.isChangedToMentor(userId)) {
        return res.status(StatusCode.REQUEST_SUCCEDED).send({
          status: StatusCode.REQUEST_SUCCEDED,
          message: 'User account changed to mentor',
        });
      }
      /*
      // Faced with unexpected error while changing
      return res.status(StatusCode.SERVER_ERROR).send({
        status: StatusCode.SERVER_ERROR,
        message: 'Failed to change user to mentor, try again later.',
      });
      */
    };

    // Return all users who are mentors
    getMentors = (req, res) => {
      const mentors = User.getAll();
      return res.status(StatusCode.REQUEST_SUCCEDED).send({
        status: StatusCode.REQUEST_SUCCEDED,
        data: mentors,
      });
    };

    // Return a specific mentor with id
    getMentorById = (req, res) => {
      const { mentorId } = req.params;
      // Validation:
      // 1. Check if mentorId exists
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
