import { z } from "zod";

const UpdatePinSchema = z
  .object({
    oldPin: z
      .string({ message: "Current PIN is required" })
      .min(4, "Invalid PIN")
      .max(4),
    newPin: z
      .string({ message: "New PIN is required" })
      .min(4, "Invalid PIN")
      .max(4),
    confirmPin: z
      .string({ message: "Confirm PIN is required" })
      .min(4, "Invalid PIN")
      .max(4),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "Pins do not match",
    path: ["confirmPin"],
  });

export type UpdatePinSchemaType = z.infer<typeof UpdatePinSchema>;
export default UpdatePinSchema;
