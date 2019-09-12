import express from 'express';
import UserController from '../controllers/user_controller';
import isUser from '../middlware/isUser';
import isAdmin from '../middlware/isAdmin';

const router = express.Router();
const {
  signUp, signIn,
  changeUserToMentor,
  getMentors, getMentorById,
  changeUserToAdmin,
} = UserController;
router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);
router.patch('/user/:userId', isUser, isAdmin, changeUserToMentor);
router.patch('/user/:userId/manage', isUser, isAdmin, changeUserToAdmin);
router.get('/mentors', isUser, getMentors);
router.get('/mentors/:mentorId', isUser, getMentorById);
export default router;
