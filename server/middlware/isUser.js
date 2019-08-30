import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import User from '../models/user_model';
import StatusCode from '../helpers/status_codes';

dotenv.config();

// eslint-disable-next-line consistent-return
const isUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ status: StatusCode.UNAUTHORIZED, error: 'Access denied. No token provided' });

  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    if (!User.isUserExist(id)) {
      return res.status(404).send({ status: StatusCode.NOT_FOUND, error: `The User associated with this token of ${id} id was banned or deleted!.` });
    }
    next();
  } catch (error) {
    return res.status(400).send({ status: StatusCode.BAD_REQUEST, error: error.message });
  }
};

export default isUser;
