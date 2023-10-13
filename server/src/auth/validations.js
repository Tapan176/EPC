const { validate, Joi } = require('express-validation');

const signUpValidation = validate({
  body: Joi.object({
    name: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    email: Joi.string()
      .email()
      .pattern(/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|in)$/)
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9@]{3,30}/)
      .required(),
    confirmPassword: Joi.ref('password'),
    address: Joi.string().required(),
  }),
});

const loginValidation = validate({
  body: Joi.object({
    email: Joi.string()
      .email()
      .pattern(/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|in)$/)
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9@]{3,30}/)
      .required(),
  }),
});

const forgotPasswordValidation = validate({
  body: Joi.object({
    email: Joi.string()
      .email()
      .pattern(/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|in)$/)
      .required(),
  }),
});

const resetPasswordValidation = validate({
  body: Joi.object({
    newPassword: Joi.string().regex(/[a-zA-Z0-9@]{3,30}/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
  }),
});

module.exports = {
  signUpValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};