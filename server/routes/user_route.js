import express from 'express';
import UserController from '../controllers/user_controller';
import isUser from '../middlware/isUser';
import isAdmin from '../middlware/isAdmin';

const router = express.Router();
// Creation of Controller Object
const userController = new UserController();
// POST /auth/signup
// Create user account
router.post('/auth/signup', userController.signUp);
// POST /auth/signin
// Login a user
router.post('/auth/signin', userController.signIn);
// PATCH /user/:userId
// Change a user to a mentor.
router.patch('/user/:userId', isUser, isAdmin, userController.changeUserToMentor);
// GET /mentors
// Get all mentors
router.get('/mentors', isUser, userController.getMentors);
// GET /mentors/:mentorId
// Get a specific mentor
router.get('/mentors/:mentorId', isUser, userController.getMentorById);
export default router;
