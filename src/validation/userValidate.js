import Joi from 'joi';

const signupSchema = Joi.object({
  userName: Joi.string().trim().min(1).max(30)
    .required()
    .messages({
      'string.base': 'userName should be a string',
      'string.min': 'the userName should have at least one character',
      'string.max': 'the userName should have less than 30 character',
      'any.required': 'userName is required',
      'string.empty': 'userName can\'t empty',
    }),
  password: Joi.string().trim().min(8).required()
    .messages({
      'string.base': 'password should be a string',
      'string.min': 'The password should have more than 7 character',
      'any.required': 'password is required',
      'string.empty': 'password can\'t empty',
    }),
});
const loginSchema = Joi.object({
  userName: Joi.string().trim().required()
    .messages({
      'any.required': 'userName is required',
      'string.empty': 'userName can\'t empty',
    }),
  password: Joi.string().trim().required()
    .messages({
      'any.required': 'password is required',
      'string.empty': 'password can\'t empty',
    }),
});
export const validateSignup = (req, res, next) => {
  const { body } = req;
  const { error } = signupSchema.validate(body, { abortEarly: false });
  if (!error) {
    return next();
  }
  return res.status(400).json({ error: error.details.map((el) => el.message) });
};
export const validateLogin = (req, res, next) => {
  const { body } = req;
  const { error } = loginSchema.validate(body, { abortEarly: false });
  if (!error) {
    return next();
  }
  return res.status(400).json({ data: { error: error.details.map((el) => el.message) } });
};
