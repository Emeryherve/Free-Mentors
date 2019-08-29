import jwt from 'jsonwebtoken';
import User from '../models/user_model';

// eslint-disable-next-line consistent-return
const isUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ status: 'error', error: 'Access denied. No token found!' });

  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    if (!User.isUserExist(id)) {
      return res.status(404).send({ status: 'error', error: `The User associated with this token of ${id} id was banned or deleted!.` });
    }
    next();
  } catch (error) {
    return res.status(400).send({ status: 'error', error: error.message });
  }
};

export default isUser;
