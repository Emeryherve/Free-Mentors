import lodash from 'lodash';
import StatusCode from '../helpers/status_codes';
import generateAuthToken from '../helpers/jtoken_generator';
import replaceIdWithMentorId from '../helpers/id_to_mentorId';

class User {
  constructor() {
    this.users = [
      {
        id: 1,
        firstName: 'KIREZI',
        lastName: 'Herve',
        email: 'herve1@gmail.com',

        password: 'password',
        address: 'Kigali,Rwanda',
        bio: 'Passion and interest is the key for success',
        occupation: 'Backend Developer',
        expertise: 'Software engineering',
        isAdmin: true,

        isMentor: false,

      },
      {
        id: 2,
        firstName: 'KIREZI',
        lastName: 'Herve',
        email: 'herve2@gmail.com',
        password: 'password',
        address: 'Kigali,Rwanda',
        bio: 'Passion and interest is the key for success',
        occupation: 'Backend Developer',
        expertise: 'Software engineering',
        isAdmin: false,
        isMentor: true,

      },
      {
        id: 3,
        firstName: 'KIREZI',
        lastName: 'Herve',
        email: 'herve3@gmail.com',
        password: 'password',
        address: 'Kigali,Rwanda',
        bio: 'Passion and interest is the key for success',
        occupation: 'Backend Developer',
        expertise: 'Software engineering',
        isAdmin: false,
        isMentor: false,

      },
      {
        id: 4,
        firstName: 'KIREZI',
        lastName: 'Herve',
        email: 'herve4@gmail.com',
        password: 'password',
        address: 'Kigali,Rwanda',
        bio: 'Passion and interest is the key for success',
        occupation: 'Backend Developer',
        expertise: 'Software engineering',
        isAdmin: false,
        isMentor: true,
      },
      {
        id: 5,
        firstName: 'KIREZI',
        lastName: 'Herve',
        email: 'herve5@gmail.com',
        password: 'password',
        address: 'Kigali,Rwanda',
        bio: 'Passion and interest is the key for success',
        occupation: 'Backend Developer',
        expertise: 'Software engineering',
        isAdmin: false,
        isMentor: true,
      },
      {
        id: 6,
        firstName: 'KIREZI',
        lastName: 'Herve',
        email: 'herve6@gmail.com',
        password: 'password',
        address: 'Kigali,Rwanda',
        bio: 'Passion and interest is the key for success',
        occupation: 'Backend Developer',
        expertise: 'Software engineering',
        isAdmin: false,
        isMentor: true,
      },

    ];
  }

    create = (payload) => {
      const {
        firstName, lastName,
        email, password, address,
        bio, occupation, expertise,
        isMentor, isAdmin,
      } = payload;
      const currentId = this.users.length + 1;
      let newUser = {
        token: generateAuthToken(currentId, isAdmin, isMentor),
        id: currentId,
        firstName,
        lastName,
        email,
        password,
        address,
        bio,
        occupation,
        expertise,
        isMentor,
        isAdmin,
      };
      this.users.push(newUser);
      newUser = {
        status: StatusCode.RESOURCE_CREATED,
        message: 'User created successfully',
        data: lodash.pick(newUser, ['token', 'id',
          'firstName', 'lastName', 'email',
          'address', 'bio', 'occupation', 'expertise']),
      };

      return newUser;
    };

    login = (payload) => {
      const { email, password } = payload;
      const user = this.users.find(u => (u.email === email) && ((u.password === password)));
      if (!user) {
        return {
          status: StatusCode.UNAUTHORIZED,
          error:
       'email or password is incorrect!',
        };
      }
      const {
        id,
        firstName, lastName,
        address, bio,
        occupation, expertise,
        isMentor, isAdmin,
      } = user;
      let result = {
        token: generateAuthToken(id, isAdmin, isMentor),
        firstName,
        lastName,
        email,
        address,
        bio,
        occupation,
        expertise,
      };
      result = { status: StatusCode.REQUEST_SUCCEDED, message: 'User is successfully logged in', data: result };

      return result;
    };

    isEmailTaken = email => this.users.find(u => u.email === email);

    isUserExist = userId => this.users.find(u => u.id === parseInt(userId, 10));

    isAlreadyAmentor = (userId) => {
      const { isMentor } = this.users.find(u => u.id === parseInt(userId, 10));
      if (isMentor) {
        return true;
      }
      return false;
    };

    isChangedToMentor = (userId) => {
      const user = this.users.find(u => u.id === parseInt(userId, 10));
      user.isMentor = true;
      if (user.isMentor) {
        return true;
      }
      return false;
    };

    getAll = () => {
      const { users } = this;
      const mentors = [];
      for (let item = 0; item < users.length; item += 1) {
        if (users[item].isMentor === true) {
          const mentor = replaceIdWithMentorId(users[item]);
          mentors.push(mentor);
        }
      }

      return mentors;
    };

    getMentor = (mentorId) => {
      const mentor = this.users.find(u => u.id === parseInt(mentorId, 10));
      return replaceIdWithMentorId(mentor);
    };

    getMenteeEmailById = (menteeId) => {
      const { email } = this.users.find(u => u.id === parseInt(menteeId, 10));
      return email;
    }
}

export default new User();
