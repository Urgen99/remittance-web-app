import { z } from "zod";

export const EmailSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
});
export type EmailSchemaType = z.infer<typeof EmailSchema>;
