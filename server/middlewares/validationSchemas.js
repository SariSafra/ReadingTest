import Joi from 'joi';

// Define the schema for signup validation
export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Define the schema for email validation
export const emailSchema = Joi.object({
  email: Joi.string().email().required()
});

// Middleware to validate the request body against the provided schema
export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body.userData);
  if (error) {
    console.log("validation error in middlware",error)
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

