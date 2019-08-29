import express from 'express';
import SessionController from '../controllers/session_controller';
import isUser from '../middlware/isUser';
import isMentor from '../middlware/isMentor';

const router = express.Router();
// Creation of Controller Object
const sessionController = new SessionController();
// POST /sessions
// Create a mentorship session request.
router.post('/', isUser, sessionController.createSessionRequest);
// PATCH /sessions/:sessionId/accept
// A mentor can accept a mentorship session request
router.patch('/:sessionId/accept', isUser,
  isMentor, sessionController.acceptRequest);
// PATCH /sessions/:sessionId/reject
// A mentor can reject a mentorship session request.
router.patch('/:sessionId/reject', isUser, isMentor,
  sessionController.rejectRequest);

export default router;
