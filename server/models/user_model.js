import replaceIdWithMentorId from '../helpers/id_to_mentorId';

class User {
  constructor() {
    this.users = [];
  }

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
