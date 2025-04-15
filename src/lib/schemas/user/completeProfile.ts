import { z } from "zod";

const DOCUMENT_TYPE = z.union([
  z.literal("passport"),
  z.literal("license"),
  z.literal("nationalId"),
]);

const DocumentSelectSchema = z.object({
  type: DOCUMENT_TYPE,
});

const DocumentFrontSchema = z.object({
  front: z.instanceof(File, { message: "Document front is required" }),
});
const DocumentBackSchema = z.object({
  back: z.instanceof(File, { message: "Document back is required" }),
});

const PersonalDetailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.optional(z.string()),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Expiry date is required" })
  ),

  document: z.object({
    type: DOCUMENT_TYPE,
    number: z.string().min(1, "Document number is required"),
    expiry: z.date({ required_error: "Expiry date is required" }),
  }),
  address: z.object({
    city: z.string().min(1, "City is required"),
    addressLine: z.string().min(1, "Address line is required"),
  }),
});

export type DocumentSelectSchemaType = z.infer<typeof DocumentSelectSchema>;
export type DocumentFrontSchemaType = z.infer<typeof DocumentFrontSchema>;
export type DocumentBackSchemaType = z.infer<typeof DocumentBackSchema>;
export type PersonalDetailSchemaType = z.infer<typeof PersonalDetailSchema>;

export {
  DocumentBackSchema,
  DocumentFrontSchema,
  DocumentSelectSchema,
  PersonalDetailSchema,
};
