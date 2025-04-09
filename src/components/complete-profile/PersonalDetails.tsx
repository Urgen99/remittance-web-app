import { setFormData } from "@/features/complete-profile/slice";
import { RootState } from "@/features/store";
import { PersonalDetailSchema, UserFormSchema } from "@/lib/formSchema";
import { FormDescription } from "@/lib/type";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { FormIcons } from "../icons/Icons";
import FormHeadingDescription from "../shared/FormHeadingDescription";
import DatePicker from "../ui/complete-profile-form/DatePicker";
import DateSelector from "../ui/complete-profile-form/DateSelector";
import DropDownSelect from "../ui/complete-profile-form/DropDownSelect";
import TextInput from "../ui/complete-profile-form/TextInput";
import NavigationButtons from "./NavigationButtons";

interface PersonalDetailProps {
  handlePrev: () => void;
}
const personalDetailSchema = UserFormSchema.pick({
  firstName: true,
  middleName: true,
  lastName: true,
  documentType: true,
  documentExpiry: true,
  documentNumber: true,
  addressLine: true,
  city: true,
  birthDate: true,
});

const formDescription: FormDescription = {
  Icon: FormIcons.UserAdd,
  title: "Enter your personal details",
  subtitle:
    "Please enter your personal details below to proceed. Ensure all information is accurate and matches your official identification documents.",
};
const documentItems = [
  {
    value: "passport",
    label: "Passport",
  },
  {
    value: "license",
    label: "Driving License",
  },
  {
    value: "nationalId",
    label: "National Id",
  },
];

type PersonalDetailSchema = z.infer<typeof personalDetailSchema>;

const PersonalDetails: React.FC<PersonalDetailProps> = ({ handlePrev }) => {
  const { documentType, documentFront, documentBack } = useSelector(
    (state: RootState) => state.userForm
  );

  const dispatch = useDispatch();
  const form = useForm<PersonalDetailSchema>({
    mode: "all",
    resolver: zodResolver(personalDetailSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: new Date(),
      documentType,
      documentExpiry: new Date(),
      documentNumber: "",
      city: "",
      addressLine: "",
    },
  });

  useEffect(() => {
    if (!documentBack) {
      handlePrev();
    }
  }, [documentBack, handlePrev]);

  function onSubmit(data: PersonalDetailSchema) {
    const formData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiry: data.documentExpiry,
      documentFront,
      documentBack,
      city: data.city,
      addressLine: data.addressLine,
    };
    dispatch(setFormData(formData));
  }

  return (
    <main className="mt-7">
      <section className="flex  items-center justify-center">
        <div className="max-w-[50rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />

          {/* ---------- FORM CONTAINER ---------- */}
          <FormProvider {...form}>
            <form
              className="w-full flex flex-col items-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="w-full flex items-center gap-3">
                <TextInput
                  name="firstName"
                  label="First Name"
                  isImportant
                  placeholder="Enter your first name"
                  control={form.control}
                />
                <TextInput
                  name="middleName"
                  label="Middle Name"
                  isImportant={false}
                  placeholder="Enter your middle name"
                  control={form.control}
                />

                <TextInput
                  name="lastName"
                  label="Last Name"
                  isImportant
                  placeholder="Enter your last name"
                  control={form.control}
                />
              </div>

              <div className="w-full flex items-center gap-3">
                <DateSelector
                  name="birthDate"
                  label="Select your birth date"
                  isImportant
                  form={form}
                />

                <div className="flex-1">
                  <DropDownSelect
                    name="documentType"
                    label="Document Type"
                    control={form.control}
                    isImportant
                    defaultValue={documentType}
                    items={documentItems}
                    placeholder="Select Document Type"
                  />
                </div>
              </div>

              <div className="w-full flex items-center gap-3">
                <TextInput
                  name="documentNumber"
                  label="Document Number"
                  isImportant
                  placeholder="Eg: 123456"
                  control={form.control}
                />

                <DatePicker
                  name="documentExpiry"
                  label="Document Expiry Date"
                  control={form.control}
                  isImportant
                />
              </div>

              <div className="w-full flex items-center gap-3">
                <TextInput
                  name="city"
                  label="Enter your city Name"
                  isImportant
                  placeholder="Eg: Kathmandu"
                  control={form.control}
                />

                <TextInput
                  name="addressLine"
                  label="Enter the address line"
                  isImportant
                  placeholder="Eg:Bhaktpur, Jadibuti"
                  control={form.control}
                />
              </div>

              <NavigationButtons
                type="submit"
                onBackClick={handlePrev}
                disabled={!form.formState.isValid}
              />
            </form>
            <DevTool control={form.control} />
          </FormProvider>
        </div>
      </section>
    </main>
  );
};

export default PersonalDetails;
