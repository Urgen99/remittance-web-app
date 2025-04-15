import { z } from "zod";

export const OTPSchema = z.object({
  otp: z.string().min(6, "Invalid OTP").max(6),
});

export type OTPSchemaType = z.infer<typeof OTPSchema>;
