import express from 'express';
import UserController from '../controllers/user_controller';
import isUser from '../middlware/isUser';
import isAdmin from '../middlware/isAdmin';

const router = express.Router();
const userController = new UserController();
router.post('/auth/signup', userController.signUp);
router.post('/auth/signin', userController.signIn);
router.patch('/user/:userId', isUser, isAdmin, userController.changeUserToMentor);
router.get('/mentors', isUser, userController.getMentors);
router.get('/mentors/:mentorId', isUser, userController.getMentorById);
export default router;
