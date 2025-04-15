import { z } from "zod";

const PersonalDetailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.optional(z.string()),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.coerce.date(),
  document: z.object({
    type: z.union([
      z.literal("passport"),
      z.literal("license"),
      z.literal("nationalId"),
    ]),
    number: z.string().min(1, "Document number is required"),
    expiry: z.date({ required_error: "Expiry date is required" }),
  }),
  address: z.object({
    city: z.string().min(1, "City is required"),
    addressLine: z.string().min(1, "Address line is required"),
  }),
});

const UserFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.optional(z.string()),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Expiry date is required" })
  ),

  documentType: z.union([
    z.literal("passport"),
    z.literal("license"),
    z.literal("nationalId"),
  ]),
  documentNumber: z.string().min(1, "Document number is required"),
  documentExpiry: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Expiry date is required" })
  ),

  documentFront: z.instanceof(File, { message: "Document front is required" }),
  documentBack: z.instanceof(File, { message: "Document back is required" }),

  city: z.string().min(1, "City is required"),
  addressLine: z.string().min(1, "Address line is required"),
});

export type UserFormSchemaType = z.infer<typeof UserFormSchema>;

export { PersonalDetailSchema, UserFormSchema };
