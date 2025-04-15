import { z } from "zod";

const AmountDetailSchema = z.object({
  senderCountry: z.string().min(1, "Please select a country"),
  receiverCountry: z.string().min(1, "Please select a country"),
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.union([
    z.literal("card"),
    z.literal("apple-pay"),
    z.literal("google-pay"),
    z.literal("stripe"),
  ]),
  deliveryMethod: z.union([z.literal("pickup"), z.literal("delivery")]),
  remarks: z.string().min(1, "Remarks is required"),
});

export type AmountDetailSchemaType = z.infer<typeof AmountDetailSchema>;

export { AmountDetailSchema };
