import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  BAD_REQUEST,
  UNAUTHORIZED, FORBIDDEN,
} from '../helpers/status_codes';

dotenv.config();

const isAdminUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({
      status: UNAUTHORIZED,
      error: 'Access denied. No token provided',
    });
  }

  try {
    const { isAdmin } = jwt.verify(token, process.env.JWTSECRET);
    if (!isAdmin) {
      return res.status(403).send({
        status: FORBIDDEN,
        error: 'Oops!, you are not allowed to perform this action, Please You must be an admin to do so!.',
      });
    }
    next();
  } catch (error) {
    return res.status(400).send({
      status: BAD_REQUEST,
      error: error.message,
    });
  }
};

export default isAdminUser;
