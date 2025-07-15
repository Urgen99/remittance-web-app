import { z } from "zod";

const SendMoneyFormSchema = z.object({
  // Step - 1: Amount Details
  sendingCountryId: z.string(),
  sendingCurrencyId: z.string(),
  payoutCountryId: z.string(),
  payoutCurrencyId: z.string(),
  sendingAmount: z.string().min(1, "Amount is required"),
  paymentTypeId: z.string().min(1, "Please select a payment method"),
  deliveryMethodId: z.string().min(1, "Please select a delivery type"),
  remarks: z.string().min(1, "Remarks is required"),

  // Step - 2: Receiver Details
  BankName: z.string().min(1, "Please select a bank"),
  accountName: z.string().min(1, "Please enter receiver account number"),
  beneficiaryFirstName: z.string().min(1, "Please enter receiver first name"),
  beneficiaryMiddleName: z.optional(z.string()),
  beneficiaryLastName: z.string().min(1, "Please enter receiver last name"),
  beneficiaryMobileNumber: z
    .string()
    .min(1, "Please enter receiver phone number")
    .max(10),
  beneficiaryAddress: z.string().min(1, "Please enter address"),
  saveBeneficiary: z.optional(z.boolean()),

  // Step - 3: Card Details
  CardHolderName: z.string().min(1, "Please enter card holder's name"),
  CardNumber: z.string().min(1, "Please enter card number"),
  CardExpiry: z.string().min(1, "Please enter card's expiry date"),
  CardCsv: z.string().min(1, "Please enter card's csv"),
  SavePaymentInfo: z.optional(z.boolean()),

  // Step - 4: Terms accept
  TermsAccepted: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must agree to the terms and conditions"
    ),
});

const AmountDetailSchema = SendMoneyFormSchema.pick({
  sendingCountryId: true,
  sendingCurrencyId: true,
  payoutCountryId: true,
  payoutCurrencyId: true,
  sendingAmount: true,
  paymentTypeId: true,
  deliveryMethodId: true,
  remarks: true,
});

const ReceiverDetailsSchema = SendMoneyFormSchema.pick({
  BankName: true,
  accountName: true,
  beneficiaryFirstName: true,
  beneficiaryMiddleName: true,
  beneficiaryLastName: true,
  beneficiaryMobileNumber: true,
  beneficiaryAddress: true,
  saveBeneficiary: true,
});

const CardDetailsSchema = SendMoneyFormSchema.pick({
  CardHolderName: true,
  CardNumber: true,
  CardExpiry: true,
  CardCsv: true,
  SavePaymentInfo: true,
});

const TermsSchema = SendMoneyFormSchema.pick({
  TermsAccepted: true,
});

export type AmountDetailSchemaType = z.infer<typeof AmountDetailSchema>;
export type SendMoneyFormSchemaType = z.infer<typeof SendMoneyFormSchema>;
export type ReceiverDetailsSchemaType = z.infer<typeof ReceiverDetailsSchema>;
export type CardDetailsSchemaType = z.infer<typeof CardDetailsSchema>;
export type TermsSchemaType = z.infer<typeof TermsSchema>;

export {
  AmountDetailSchema,
  CardDetailsSchema,
  ReceiverDetailsSchema,
  SendMoneyFormSchema,
  TermsSchema,
};
