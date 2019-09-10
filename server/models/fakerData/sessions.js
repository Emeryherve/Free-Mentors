import faker from 'faker';

const sessions = [
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
    menteeEmail: 'herve3@gmail.com',
    status: 'accepted',
  },
  {
    sessionId: 3,
    mentorId: 5,
    menteeId: 3,
    questions: 'Just for test',
    menteeEmail: 'herve4@gmail.com',
    status: 'rejected',
  },
  {
    mentorId: 3,
    questions: ' ',
  },
  {
    mentorId: '4k',
    questions: 'Just for test',
  },
  {
    questions: 'Just for test',
  },
  {
    mentorId: 4,
  },
  {
    mentorId: 6,
    questions: 'Just for test',
  },
];

export default sessions;
