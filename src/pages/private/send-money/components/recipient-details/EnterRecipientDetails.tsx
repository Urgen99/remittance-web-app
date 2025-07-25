import { SendMoneyForm } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import NavigationButtons from "@/pages/private/complete-profile/components/NavigationButtons";

import CheckBox from "@/components/ui/forms/CheckBox";
import DropDownSelect from "@/components/ui/forms/DropDownSelect";
import TextInput from "@/components/ui/forms/TextInput";
import { saveTransactionForm } from "@/features/transactions/transactions.slice";
import {
  ReceiverDetailsSchema,
  ReceiverDetailsSchemaType,
} from "@/lib/schemas/send-money/amountDetails";
import { FormDescription } from "@/lib/type";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface RecipientDetailsProps {
  handleNext: () => void;
  handlePrev: () => void;
}
const formDescription: FormDescription = {
  Icon: SendMoneyForm.ReceiverDetails.ArchiveDown,
  title: "Enter receiver's details",
  subtitle:
    "Enter the receiver details in the form below , make sure they are correct",
};

// const ReceiverDetailsSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   middleName: z.optional(z.string()),
//   lastName: z.string().min(1, "Last name is required"),
//   addressLine: z.string().min(1, "Address line is required"),
//   bankName: z.string().min(1, "Please select a bank"),
//   accountNumber: z.string().min(1, "Account number is required"),
//   phoneNumber: z.string().min(1, "Phone number is required"),
//   isSaved: z.optional(z.boolean()),
// });

// export type ReceiverDetailsSchema = z.infer<typeof ReceiverDetailsSchema>;

const banks = [
  { label: "Nepal Bank Limited", value: "nepal-bank-limited" },
  { label: "Nabil Bank", value: "nabil-bank" },
  { label: "Nepal Commercial Bank", value: "nepal-commercial-bank" },
];

const EnterRecipientDetails = ({
  handleNext,
  handlePrev,
}: RecipientDetailsProps) => {
  const dispatch = useDispatch();
  // const formState = useSelector(selectCurrentFormData);
  // console.log("formState", formState);

  const form = useForm<ReceiverDetailsSchemaType>({
    mode: "all",
    resolver: zodResolver(ReceiverDetailsSchema),
    defaultValues: {
      BankName: "",
      accountName: "",
      beneficiaryFirstName: "",
      beneficiaryMiddleName: "",
      beneficiaryLastName: "",
      beneficiaryMobileNumber: "",
      beneficiaryAddress: "",
      saveBeneficiary: false,
    },
  });

  function onSubmit(data: ReceiverDetailsSchemaType) {
    dispatch(saveTransactionForm(data));
    handleNext();
  }

  return (
    <section className="flex flex-col gap-6 items-center justify-center">
      <div className="max-w-[33.5rem] flex flex-col gap-14 items-center w-full">
        {/* ---------- FORM DESCRIPTION ---------- */}
        <FormHeadingDescription formDescription={formDescription} />
      </div>

      {/* ---------- FORM CONTAINER ---------- */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-44 justify-between w-full h-full"
        >
          <div className="space-y-2 ">
            <div className="space-y-8">
              <div>
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1">
                    <DropDownSelect
                      key="bankName"
                      name="BankName"
                      label="Select a bank"
                      control={form.control}
                      isImportant
                      items={banks}
                      placeholder="Select a bank"
                    />
                  </div>
                  <TextInput
                    name="accountName"
                    label="Account number"
                    isImportant
                    placeholder="Eg:2025-12-11"
                    control={form.control}
                  />
                </div>

                <div className="w-full flex items-center gap-3">
                  <TextInput
                    name="beneficiaryFirstName"
                    label="First Name"
                    isImportant
                    placeholder="Enter recipient your first name"
                    control={form.control}
                  />
                  <TextInput
                    name="beneficiaryMiddleName"
                    label="Middle Name"
                    isImportant={false}
                    placeholder="Enter recipient your middle name"
                    control={form.control}
                  />

                  <TextInput
                    name="beneficiaryLastName"
                    label="Last Name"
                    isImportant
                    placeholder="Enter recipient last name"
                    control={form.control}
                  />
                </div>
              </div>

              <div>
                <hr className="border-[#E0E0E0]" />
              </div>

              <div className="w-full flex items-center gap-3">
                <TextInput
                  name="beneficiaryMobileNumber"
                  label="Phone Number"
                  isImportant={false}
                  placeholder="Eg:12345"
                  control={form.control}
                />

                <TextInput
                  name="beneficiaryAddress"
                  label="Address Line"
                  isImportant
                  placeholder="Eg:12345"
                  control={form.control}
                />
              </div>
            </div>

            <div>
              <CheckBox
                name="SaveReceiverInfo"
                label="Save this info for easier transfer"
                isImportant={false}
                control={form.control}
              />
            </div>
          </div>

          <div className="max-w-[50rem] flex flex-col items-center w-full gap-14">
            <NavigationButtons
              onBackClick={handlePrev}
              disabled={!form.formState.isValid}
              type="submit"
            />
          </div>
        </form>
        <DevTool control={form.control} />
      </FormProvider>
    </section>
  );
};

export default EnterRecipientDetails;
