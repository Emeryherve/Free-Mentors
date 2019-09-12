import express from 'express';
import SessionController from '../controllers/session_controller';
import isUser from '../middlware/isUser';
import isMentor from '../middlware/isMentor';

const router = express.Router();
const {
  createSessionRequest,
  acceptRequest, rejectRequest,
} = SessionController;

router.post('/', isUser, createSessionRequest);
router.patch('/:sessionId/accept', isUser,
  isMentor, acceptRequest);
router.patch('/:sessionId/reject', isUser, isMentor,
  rejectRequest);

export default router;
