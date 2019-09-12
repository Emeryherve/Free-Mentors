import Model from '../models/dbQuery';
import hashPassword from '../helpers/hashPassword';
import generateAuthToken from '../helpers/jtoken_generator';
import replaceIdWithMentorId from '../helpers/id_to_mentorId';

import {
  REQUEST_SUCCEDED, RESOURCE_CREATED,
  BAD_REQUEST, FORBIDDEN, NOT_FOUND,
  REQUEST_CONFLICT, SERVER_ERROR,
  UNAUTHORIZED,
} from '../helpers/status_codes';
import Validator from '../helpers/validator';

class UserController {
  static model() {
    return new Model('users');
  }

    static signUp = async (req, res) => {
      try {
        let {
          firstName, lastName,
          email, password, address,
          bio, occupation, expertise,
          isMentor, isAdmin,
        } = req.body;

        const result = Validator.validateSignUpRequest(req.body);
        if (result.error == null) {
          const user = await this.model().select('*', 'email=$1', [email]);
          if (user[0]) {
            return res.status(REQUEST_CONFLICT).json({
              status: REQUEST_CONFLICT,
              error: `${email} is already taken!, Give it another try different email.`,
            });
          }
          if (!Validator.validData(firstName)) {
            return res.status(BAD_REQUEST).send({
              status: BAD_REQUEST,
              error: 'firstName can\'t be empty',
            });
          }
          if (!Validator.validData(lastName)) {
            return res.status(BAD_REQUEST).send({
              status: BAD_REQUEST,
              error: 'LastName can\'t be empty',
            });
          }
          if (!Validator.validData(password)) {
            return res.status(BAD_REQUEST).send({
              status: BAD_REQUEST,
              error: 'password can\'t be empty',
            });
          }
          password = await hashPassword.encryptPassword(password);

          const cols = 'first_name, last_name, email,password, address, bio,occupation,expertise,is_admin,is_mentor';
          const sels = `'${firstName}', '${lastName}', '${email}', '${password}',
          '${address}', '${bio}','${occupation}','${expertise}','${isAdmin}','${isMentor}'`;
          const rows = await this.model().insert(cols, sels);
          let token = generateAuthToken(rows[0].id, rows[0].is_admin, rows[0].is_mentor);

          return res.status(RESOURCE_CREATED).json({
            status: RESOURCE_CREATED,
            message: 'User created successfully',
            data: { token },
          });
        }
        return res.status(BAD_REQUEST).send({
          status: BAD_REQUEST,
          error: `${result.error.details[0].message}`,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          status: SERVER_ERROR,
          error: 'server error ',
        });
      }
    };

    static signIn = async (req, res) => {
      try {
        const result = Validator.validateSignInRequest(req.body);
        if (result.error == null) {
          const { email, password } = req.body;
          const data = await this.model().select('*', 'email=$1', [email]);
          if (data[0] && hashPassword.decryptPassword(password, data[0].password)) {
            const token = generateAuthToken(data[0].id, data[0].is_admin, data[0].is_mentor);
            return res.status(REQUEST_SUCCEDED).json({
              status: REQUEST_SUCCEDED,
              message: 'User is successfully logged in',
              data: { token },
            });
          }
          return res.status(UNAUTHORIZED).json({
            status: UNAUTHORIZED,
            error: 'email or password is incorrect!',
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

    static changeUserToMentor = async (req, res) => {
      try {
        const { userId } = req.params;
        if (isNaN(userId.trim())) {
          return res.status(BAD_REQUEST).send({
            status: BAD_REQUEST,
            error: 'User id should be an integer',
          });
        }
        const user = await this.model().select('*', 'id=$1', [userId]);
        if (user.length === 0) {
          return res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            error: `The user with ${userId} id is not found!.`,
          });
        }

        if (user[0].is_mentor === true) {
          return res.status(FORBIDDEN).send({
            status: FORBIDDEN,
            error: `The user with ${userId} id is already a mentor!.`,
          });
        }
        const rows = await this.model().update('is_mentor=$1', 'id=$2', [true, userId]);
        if (rows) {
          return res.status(REQUEST_SUCCEDED).send({
            status: REQUEST_SUCCEDED,
            message: 'User account changed to mentor',
          });
        }
      } catch (e) {
        return res.status(SERVER_ERROR).json({
          status: SERVER_ERROR,
          error: 'server error',
        });
      }
    };

    static getMentors = async (req, res) => {
      const mentors = await this.model().select('*', 'is_mentor=$1', [true]);
      const mentorsContainer = [];
      for (let item = 0; item < mentors.length; item += 1) {
        const mentor = replaceIdWithMentorId(mentors[item]);
        mentorsContainer.push(mentor);
      }
      return res.status(REQUEST_SUCCEDED).send({
        status: REQUEST_SUCCEDED,
        data: mentorsContainer,
      });
    };

  static getMentorById = async (req, res) => {
    const { mentorId } = req.params;
    const user = await this.model().select('*', 'id=$1', [mentorId]);
    if (user.length === 0) {
      return res.status(NOT_FOUND).send({
        status: NOT_FOUND,
        error: `The user with ${mentorId} id is not found!.`,
      });
    }
    const mentor = await this.model().select('*', 'id=$1 AND is_mentor=$2', [mentorId, true]);
    return res.status(REQUEST_SUCCEDED).send({
      status: REQUEST_SUCCEDED,
      data: replaceIdWithMentorId(mentor[0]),
    });
  };
}

export default UserController;
