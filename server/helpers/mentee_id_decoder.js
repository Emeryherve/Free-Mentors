import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import status from './status_codes';

dotenv.config();


const getMenteeIdInToken = (token, res) => {
  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    return id;
  } catch (error) {
    return res.status(status.BAD_REQUEST).send({
      status: status.BAD_REQUEST,
      error: error.message,
    });
  }
};

export default getMenteeIdInToken;
