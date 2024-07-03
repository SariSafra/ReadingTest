import Joi from "joi";

const validationSchema = Joi.object({
    username: Joi.string().required().label('Username'),
    password: Joi.string().min(6).required().label('Password'),
    role: Joi.string().valid('student', 'teacher').required().label('Role')
  });
  

  export {validationSchema};