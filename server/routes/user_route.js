import express from 'express';
import UserController from '../controllers/user_controller';
import isUser from '../middlware/isUser';
import isAdmin from '../middlware/isAdmin';

const router = express.Router();
const { signUp, signIn } = UserController;
router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);
export default router;
