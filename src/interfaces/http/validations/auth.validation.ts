import { email, password } from "./common.validation";

import Joi from "joi";

export const signupSchema = Joi.object({
  first_name: Joi.string().trim().min(2),
  last_name: Joi.string().trim().min(2),
  email: email.required(),
  password: password.required(),
});

export const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

export const forgotPasswordSchema = Joi.object({
  email: email.required(),
});