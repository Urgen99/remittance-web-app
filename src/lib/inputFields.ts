import {
  CreatePasswordSchema,
  ForgotPasswordSchema,
  LoginFormSchema,
  OTPSchema,
  RegisterFormSchema,
} from "./formSchema";
import { InputFieldsType } from "./type";

const loginFields: InputFieldsType<typeof LoginFormSchema>[] = [
  {
    name: "password",
    type: "password",
    label: "Password",
    isImportant: true,
    placeholder: "********",
  },
];

const registerFields: InputFieldsType<typeof RegisterFormSchema>[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    isImportant: true,
    placeholder: "Enter email address",
  },
];

const forgotPasswordFields: InputFieldsType<typeof ForgotPasswordSchema>[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    isImportant: true,
    placeholder: "Enter email address",
  },
];

const createPasswordFields: InputFieldsType<typeof CreatePasswordSchema>[] = [
  {
    name: "newPassword",
    type: "password",
    label: "New Password",
    isImportant: true,
    placeholder: "********",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm new Password",
    isImportant: true,
    placeholder: "********",
  },
];

const otpField: InputFieldsType<typeof OTPSchema>[] = [
  {
    name: "otp",
    type: "text",
    placeholder: "********",
  },
];

export {
  createPasswordFields,
  forgotPasswordFields,
  loginFields,
  otpField,
  registerFields,
};
