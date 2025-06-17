import { z } from "zod";

const DOCUMENT_TYPE_ID = z.union([
  z.literal(1), // 1 National ID
  z.literal(2), // 2 License
  z.literal(3), // 3 Passport
]);

const AddressSchema = z.object({
  countryId: z.number(),
  postCode: z.string(),
  unit: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  address: z.string(),
});

const DocumentSchema = z.object({
  documentTypeId: DOCUMENT_TYPE_ID,
  documentUpload: z.string().uuid(),
});

const KycSchema = z.object({
  // 1.  Personal Info
  firstName: z.string().min(1, "First name is required"),
  middleName: z.optional(z.string()),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Birth date is required" })
  ),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .max(10, "Mobile number must be 10 digits"),
  birthCountryId: z.number().min(1, "Please select birth country"),

  //   2. Addresses
  permanentAddress: AddressSchema,
  temporaryAddress: AddressSchema,

  // 3. Documents
  // documents: z
  //   .array(DocumentSchema)
  //   .min(1, "You must upload at least 1 document")
  //   .max(2, "You can only upload 2 documents"),
  documentFront: DocumentSchema,
  documentBack: DocumentSchema,

  //   4. Identity
  identityTypeId: DOCUMENT_TYPE_ID,
  identityNo: z.string().min(1, "Identity number is required"),
  identityIssuedBy: z.string().min(1, "Please enter identity holder's name"),
  identityIssuedDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Issued date is required" })
  ),
  identityExpiryDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Expiry date is required" })
  ),
  identityIssuedCountryId: z.number().min(1, "Please select issued country"),
});

export type KycSchemaType = z.infer<typeof KycSchema>;
export { KycSchema };
