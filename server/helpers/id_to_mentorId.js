
const replaceIdWithMentorId = (obj) => {
  const {
    id, first_name, last_name, email, address, bio, occupation, expertise,
  } = obj;
  const newObj = {
    mentorId: id,
    firstName: first_name,
    lastName: last_name,
    email,
    address,
    bio,
    occupation,
    expertise,
  };
  return newObj;
};

export default replaceIdWithMentorId;
