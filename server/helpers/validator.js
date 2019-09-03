import Joi from 'joi';

class Validator {
  // General Validation method for all ones
  validate = (request, schema) => {
    const result = Joi.validate(request, schema);
    return result;
  };

  // SignUp validator fn
  validateSignUpRequest = (request) => {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      address: Joi.string().required(),
      bio: Joi.string().required(),
      occupation: Joi.string().required(),
      expertise: Joi.string().required(),
      isAdmin: Joi.boolean().default(false),
      isMentor: Joi.boolean().default(false),
    };
    return this.validate(request, schema);
  };

  // LogIn validator fn
  validateSignInRequest = (request) => {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.required(),
    };
    return this.validate(request, schema);
  };

  // Mentorship Request Validator fn
  validateMentorShipRequest = (request) => {
    const schema = {
      mentorId: Joi.number().required(),
      questions: Joi.string().required(),
    };
    return this.validate(request, schema);
  };

  validData = (name) => {
    const entity = name.replace(/[^a-zA-Z0-9]/g, '');
    if (entity) return true;
    return false;
  };
}

export default new Validator();
