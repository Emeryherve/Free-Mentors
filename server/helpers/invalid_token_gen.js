import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateInvalidToken = (id, isAdmin, isMentor) => {
  const token = jwt.sign({ id, isAdmin, isMentor }, 'exposedSecretKey');
  return token;
};
export default generateInvalidToken;
