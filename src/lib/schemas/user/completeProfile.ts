import { z } from "zod";

const DOCUMENT_TYPE = z.union([
  z.literal("passport"),
  z.literal("license"),
  z.literal("nationalId"),
]);

const CompleteProfileSchema = z.object({
  // Basic Info
  firstName: z.string().min(1, "First name is required"),
  middleName: z.optional(z.string()),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Expiry date is required" })
  ),

  // Document Info
  documentType: DOCUMENT_TYPE,
  documentNumber: z.string().min(1, "Document number is required"),
  documentExpiry: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Expiry date is required" })
  ),
  documentFront: z.instanceof(File, { message: "Document front is required" }),
  documentBack: z.instanceof(File, { message: "Document back is required" }),

  // Address Info
  city: z.string().min(1, "City is required"),
  addressLine: z.string().min(1, "Address line is required"),
});

// Select Document Type
const DocumentSelectSchema = CompleteProfileSchema.pick({
  documentType: true,
});

// Upload Document Front
const DocumentFrontSchema = CompleteProfileSchema.pick({
  documentFront: true,
});

// Upload Document Back
const DocumentBackSchema = CompleteProfileSchema.pick({
  documentBack: true,
});

// Personal Details
const PersonalDetailSchema = CompleteProfileSchema.pick({
  firstName: true,
  middleName: true,
  lastName: true,
  birthDate: true,
  documentType: true,
  documentNumber: true,
  documentExpiry: true,
  city: true,
  addressLine: true,
});

export type DocumentSelectSchemaType = z.infer<typeof DocumentSelectSchema>;
export type DocumentFrontSchemaType = z.infer<typeof DocumentFrontSchema>;
export type DocumentBackSchemaType = z.infer<typeof DocumentBackSchema>;
export type PersonalDetailSchemaType = z.infer<typeof PersonalDetailSchema>;
export type CompleteProfileSchemaType = z.infer<typeof CompleteProfileSchema>;
export {
  DocumentBackSchema,
  DocumentFrontSchema,
  DocumentSelectSchema,
  PersonalDetailSchema,
  CompleteProfileSchema,
};
