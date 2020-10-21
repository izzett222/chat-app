import Joi from 'joi';

const signupSchema = Joi.object({
  userName: Joi.string().min(1).max(30).required()
    .messages({
      'string.base': 'userName should be a string',
      'string.min': 'the userName should have at least one character',
      'string.max': 'the userName should have less than 30 character',
      'any.required': 'userName is required',
    }),
  password: Joi.string().min(8).required()
    .messages({
      'string.base': 'password should be a string',
      'string.min': 'The password should have more than 7 character',
      'any.required': 'password is required',
    }),
});

const validateSignup = (req, res, next) => {
  const { body } = req;
  const { error } = signupSchema.validate(body, { abortEarly: false });
  if (!error) {
    return next();
  }
  return res.status(400).json({ error: error.details.map((el) => el.message) });
};

export default validateSignup;
