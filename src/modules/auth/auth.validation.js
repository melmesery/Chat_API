import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const token = joi
  .object({
    token: joi.string().required(),
  })
  .required();

export const signup = joi
  .object({
    userName: generalFields.userName,
    email: generalFields.email,
    password: generalFields.password,
    cPassword: generalFields.cPassword.valid(joi.ref("password")).required(), 
    file: generalFields.file,
  })
  .required();

export const login = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
  })
  .required();

export const sendCode = joi
  .object({
    email: generalFields.email,
  })
  .required();

export const forgetPassword = joi
  .object({
    forgetCode: joi
      .string()
      .pattern(new RegExp(/^[0-9]{4}$/))
      .required(),
    password: generalFields.password,
    cPassword: generalFields.cPassword.valid(joi.ref("password")).required(),
  })
  .required();

export const logout = {
  headers: joi
    .object({
      id: generalFields.id,
    })
    .required(),
};
