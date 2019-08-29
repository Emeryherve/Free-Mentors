import jwt from 'jsonwebtoken';

const getMenteeIdInToken = (token, res) => {
  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    return id;
  } catch (error) {
    return res.status(400).send({
      status: 'error',
      error: error.message,
    });
  }
};

export default getMenteeIdInToken;
