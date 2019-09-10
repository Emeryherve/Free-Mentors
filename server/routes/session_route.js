import express from 'express';
import SessionController from '../controllers/session_controller';
import isUser from '../middlware/isUser';
import isMentor from '../middlware/isMentor';

const router = express.Router();
const sessionController = new SessionController();
router.post('/', isUser, sessionController.createSessionRequest);
router.patch('/:sessionId/accept', isUser,
  isMentor, sessionController.acceptRequest);
router.patch('/:sessionId/reject', isUser, isMentor,
  sessionController.rejectRequest);

export default router;
