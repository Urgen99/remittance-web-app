import { z } from "zod";

export const PasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
