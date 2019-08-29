import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const isMentorUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ status: 'error', error: 'Access denied. No token provided' });

  try {
    const { isMentor } = jwt.verify(token, process.env.JWTSECRET);
    if (!isMentor) {
      return res.status(403).send({ status: 'error', error: 'Oops!, you are not allowed to perform this action, Please You must be a mentor to do so!.' });
    }
    next();
  } catch (error) {
    return res.status(400).send({ status: 'error', error: error.message });
  }
};

export default isMentorUser;
