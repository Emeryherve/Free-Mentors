import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import StatusCode from '../helpers/status_codes';

dotenv.config();

const isAdminUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ status: StatusCode.UNAUTHORIZED, error: 'Access denied. No token provided' });

  try {
    const { isAdmin } = jwt.verify(token, process.env.JWTSECRET);
    if (!isAdmin) {
      return res.status(403).send({ status: StatusCode.FORBIDDEN, error: 'Oops!, you are not allowed to perform this action, Please You must be an admin to do so!.' });
    }
    next();
  } catch (error) {
    return res.status(400).send({ status: StatusCode.BAD_REQUEST, error: error.message });
  }
};

export default isAdminUser;
