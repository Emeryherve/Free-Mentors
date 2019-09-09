import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateAuthToken = (id, isAdmin, isMentor) => {
  const token = jwt.sign({ id, isAdmin, isMentor }, process.env.JWTSECRET);
  return token;
};


export default generateAuthToken;
