import { z } from "zod";

const DELIVERY_TYPE = z.union([z.literal("pickup"), z.literal("delivery")]);

const SendMoneyFormSchema = z.object({
  // Step - 1: Amount Details
  SendingCountry: z.string().min(1, "Please select a sender country"),
  SendingCurrency: z.string().min(1, "Please select a sender currency"),
  ReceivingCountry: z.string().min(1, "Please select a receiver country"),
  ReceivingCurrency: z.string().min(1, "Please select a receiver currency"),
  SendingAmount: z.string().min(1, "Amount is required"),
  PaymentType: z.string().min(1, "Please select a payment type"),
  DeliveryType: DELIVERY_TYPE,
  Remarks: z.string(),

  // Step - 2: Receiver Details
  BankName: z.string().min(1, "Please select a bank"),
  AccountNumber: z.string().min(1, "Please enter receiver account number"),
  FirstName: z.string().min(1, "Please enter receiver first name"),
  MiddleName: z.optional(z.string()),
  LastName: z.string().min(1, "Please enter receiver last name"),
  PhoneNumber: z.optional(z.string()),
  AddressLine: z.string().min(1, "Please enter address"),
  SaveReceiverInfo: z.optional(z.boolean()),

  // Step - 3: Card Details
  CardHolderName: z.string().min(1, "Please enter card holder's name"),
  CardNumber: z.string().min(1, "Please enter card number"),
  CardExpiry: z.string().min(1, "Please enter card's expiry date"),
  CardCsv: z.string().min(1, "Please enter card's csv"),
  SavePaymentInfo: z.optional(z.boolean()),

  // Step - 4: Terms accept
  TermsAccepted: z.boolean(),
});

const AmountDetailSchema = SendMoneyFormSchema.pick({
  SendingCountry: true,
  SendingCurrency: true,
  ReceivingCountry: true,
  ReceivingCurrency: true,
  SendingAmount: true,
  PaymentType: true,
  DeliveryType: true,
  Remarks: true,
});

const ReceiverDetailsSchema = SendMoneyFormSchema.pick({
  BankName: true,
  AccountNumber: true,
  FirstName: true,
  MiddleName: true,
  LastName: true,
  PhoneNumber: true,
  AddressLine: true,
  SaveReceiverInfo: true,
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
