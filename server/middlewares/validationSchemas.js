import Joi from 'joi';


export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});



export const emailSchema = Joi.object({
  email: Joi.string().email().required()
});


const swapSchema = Joi.object({
  input: Joi.string().required(),
  times: Joi.number().required()
});

const frequencyMapSchema = Joi.object({
  correct: Joi.number().required(),
  incorrect: Joi.number().required(),
  swaps: Joi.array().items(swapSchema)
});

export const diagnosisSchema = Joi.object({
  frequencyMap: Joi.object().pattern(
    Joi.string(),
    frequencyMapSchema
  ),
  Emphasis: Joi.boolean().required(),
  Repeat: Joi.boolean().required(),
  successRate: Joi.string().required(),
  time: Joi.number().required(),
  consistentSwappingPercentage: Joi.number().required()
});


export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body.userData);
  if (error) 
    return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateDiagnosisRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) 
    return res.status(400).json({ error: error.details[0].message });
  next();
};