import { z } from "zod";

const LoginFormSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

const RegisterFormSchema = z.object({
  email: z.string().email(),
});

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

const CreatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const OTPSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits long")
    .regex(/^\d{6}$/, "OTP must contain only numbers (0-9)"),
});

export {
  CreatePasswordSchema,
  ForgotPasswordSchema,
  LoginFormSchema,
  RegisterFormSchema,
  OTPSchema,
};
