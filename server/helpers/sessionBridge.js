
class SessionBridge {
    haltIfNoSessionFound = (sessionId, object) => {
      if (!object.isSessionExist(sessionId)) {
        return `The session with ${sessionId} id is not found!.`;
      }
    };

    haltIfSessionRejected = (sessionId, object, flag) => {
      if (object.isAlreadyRejected(sessionId)) {
        return (flag === 'accept') ? 'OOps! You can not accept the rejected session request!'
          : `This Session Request with ${sessionId} id is already rejected!`;
      }
    };

    haltIfSessionAccepted = (sessionId, object, flag) => {
      if (object.isAlreadyAccepted(sessionId)) {
        return (flag === 'accept') ? `This Session Request with ${sessionId} id is already accepted!`
          : 'OOps! You can not reject the accepted Session Request!';
      }
    };
}

export default new SessionBridge();
