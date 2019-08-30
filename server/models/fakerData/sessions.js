import faker from 'faker';

const sessions = [
    // Valid created mentorship session
    //0
   {
    sessionId: 1,
    mentorId: 2,
    menteeId: 1,
    questions:'Just for test',
    menteeEmail:'herve2@gmail.com',
    status: 'pending',
   },
   //1
   {
    sessionId: 2,
    mentorId: 4,
    menteeId: 2,
    questions:'Just for test',
    menteeEmail:'herve3@gmail.com',
    status: 'accepted',
   },
   // 2
   {
    sessionId: 3,
    mentorId: 5,
    menteeId: 3,
    questions:'Just for test',
    menteeEmail:'herve4@gmail.com',
    status: 'rejected',
   },
   // 3: session request with empty questions
   {
    mentorId: 3,
    questions:' ',
   },
   // 4: session request with non integer mentorId
   {
    mentorId: '4k',
    questions:'Just for test',
   },
   // 5: session request with non mentorId
   {
    questions:'Just for test',
   },

   // 6: session request with non questions
   {
    mentorId: 4,
   },
   // 7: valid session request
   {
    mentorId: 6,
    questions: 'Just for test'
   },
]

export default sessions;