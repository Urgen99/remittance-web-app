import NavigationButtons from "@/pages/private/complete-profile/components/NavigationButtons";
import { SendMoneyForm } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";

import CheckBox from "@/components/ui/forms/CheckBox";
import DropDownSelect from "@/components/ui/forms/DropDownSelect";
import TextInput from "@/components/ui/forms/TextInput";
import {
  ReceiverDetailsSchema,
  ReceiverDetailsSchemaType,
} from "@/lib/schemas/send-money/amountDetails";
import { FormDescription } from "@/lib/type";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

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
  const form = useForm<ReceiverDetailsSchemaType>({
    mode: "all",
    resolver: zodResolver(ReceiverDetailsSchema),
    defaultValues: {
      BankName: "",
      AccountNumber: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      PhoneNumber: "",
      AddressLine: "",
      SaveReceiverInfo: false,
    },
  });

  function onSubmit(data: ReceiverDetailsSchemaType) {
    alert(data);
    handleNext();
  }

  return (
    <section className="flex flex-col gap-6 items-center justify-center w-[50rem]">
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
                      name="BankName"
                      label="Select a bank"
                      control={form.control}
                      isImportant
                      defaultValue={form.getValues("BankName")}
                      items={banks}
                      placeholder="Select a bank"
                    />
                  </div>
                  <TextInput
                    name="AccountNumber"
                    label="Account number"
                    isImportant
                    placeholder="Eg:2025-12-11"
                    control={form.control}
                  />
                </div>

                <div className="w-full flex items-center gap-3">
                  <TextInput
                    name="FirstName"
                    label="First Name"
                    isImportant
                    placeholder="Enter your first name"
                    control={form.control}
                  />
                  <TextInput
                    name="MiddleName"
                    label="Middle Name"
                    isImportant={false}
                    placeholder="Enter your middle name"
                    control={form.control}
                  />

                  <TextInput
                    name="LastName"
                    label="Last Name"
                    isImportant
                    placeholder="Enter your last name"
                    control={form.control}
                  />
                </div>
              </div>

              <div>
                <hr className="border-[#E0E0E0]" />
              </div>

              <div className="w-full flex items-center gap-3">
                <TextInput
                  name="PhoneNumber"
                  label="Phone Number"
                  isImportant={false}
                  placeholder="Eg:12345"
                  control={form.control}
                />

                <TextInput
                  name="AddressLine"
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

          <div className="flex flex-col items-center w-full gap-14">
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
