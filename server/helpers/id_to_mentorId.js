
const replaceIdWithMentorId = (obj) => {
  const {
    id, firstName, lastName, email, address, bio, occupation, expertise,
  } = obj;
  const newObj = {
    mentorId: id,
    firstName,
    lastName,
    email,
    address,
    bio,
    occupation,
    expertise,
  };
  return newObj;
};

export default replaceIdWithMentorId;
