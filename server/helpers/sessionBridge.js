
class SessionBridge {
  haltIfNotOwnerOfSession = (mentorId, session) => {
    if (session[0].mentor_id !== parseInt(mentorId, 10)) {
      return 'You are not the owner of this session request!';
    }
  };

    haltIfNoSessionFound = (session, sessionId) => {
      if (session.length === 0) {
        return `The session with ${sessionId} id is not found!.`;
      }
    };

    haltIfSessionRejected = (session, flag) => {
      if (session[0].status === 'rejected') {
        return (flag === 'accept') ? 'OOps! You can not accept the rejected session request!'
          : `This Session Request with ${session[0].id} id is already rejected!`;
      }
    };

    haltIfSessionAccepted = (session, flag) => {
      if (session[0].status === 'accepted') {
        return (flag === 'accept') ? `This Session Request with ${session[0].id} id is already accepted!`
          : 'OOps! You can not reject the accepted Session Request!';
      }
    };
}

export default new SessionBridge();
