import Joi from "joi";

const registrationUserValidation = Joi.object({
  name: Joi.string().required().max(100),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female").required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registrationUserValidation, loginUserValidation };
