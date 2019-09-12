import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Model from '../models/dbQuery';
import {
  BAD_REQUEST, NOT_FOUND,
  UNAUTHORIZED,
} from '../helpers/status_codes';

dotenv.config();
const model = new Model('users');

const isUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({
      status: UNAUTHORIZED,
      error: 'Access denied. No token provided',
    });
  }


  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    const user = await model.select('*', 'user_id=$1', [id]);
    if (!user.length) {
      return res.status(404).send({
        status: NOT_FOUND,
        error: `The User associated with this token of ${id} id was banned or deleted!.`,
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

export default isUser;
