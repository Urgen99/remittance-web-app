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
  otp: z.string().min(6, "Invalid OTP").max(6),
});

const PersonalDetailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.optional(z.string().min(1, "Middle name is required")),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.coerce.date(),
  document: z.object({
    type: z.union([
      z.literal("passport"),
      z.literal("license"),
      z.literal("nationalId"),
    ]),
    number: z.string().min(1, "Document number is required"),
    expiry: z.coerce
      .date()
      .refine((date) => date > new Date(), {
        message: "Document expiry date must be in the future",
        path: ["expiry"],
      })
      .refine((date) => date.toISOString().match(/^\d{4}-\d{2}-\d{2}$/), {
        message: "Invalid date format",
        path: ["expiry"],
      }),
  }),
  address: z.object({
    city: z.string().min(1, "City is required"),
    addressLine: z.string().min(1, "Address line is required"),
  }),
});

export {
  CreatePasswordSchema,
  ForgotPasswordSchema,
  LoginFormSchema,
  OTPSchema,
  PersonalDetailSchema,
  RegisterFormSchema,
};
