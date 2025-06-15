import { useCompleteProfileMutation } from "@/features/complete-profile/complete-profile.apiSlice";
import { setFormData } from "@/features/complete-profile/slice";
import { RootState } from "@/features/store";
import {
  PersonalDetailSchema,
  PersonalDetailSchemaType,
} from "@/lib/schemas/user/completeProfile";
import { FormDescription } from "@/lib/type";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormIcons } from "../../../../components/icons/Icons";
import FormHeadingDescription from "../../../../components/shared/FormHeadingDescription";
import DatePicker from "../../../../components/ui/forms/DatePicker";
import DateSelector from "../../../../components/ui/forms/DateSelector";
import DropDownSelect from "../../../../components/ui/forms/DropDownSelect";
import TextInput from "../../../../components/ui/forms/TextInput";
import NavigationButtons from "./NavigationButtons";
interface PersonalDetailProps {
  handlePrev: () => void;
}

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

const PersonalDetails: React.FC<PersonalDetailProps> = ({ handlePrev }) => {
  const { documentType, documentFront, documentBack } = useSelector(
    (state: RootState) => state.userForm
  );

  const dispatch = useDispatch();
  const form = useForm<PersonalDetailSchemaType>({
    mode: "all",
    resolver: zodResolver(PersonalDetailSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: new Date(),
      documentType: documentType,
      documentExpiry: new Date(),
      documentNumber: "",
      city: "",
      addressLine: "",
    },
  });

  const [
    completeProfile,
    //  { isLoading }
  ] = useCompleteProfileMutation();

  useEffect(() => {
    if (!documentBack) {
      handlePrev();
    }
  }, [documentBack, handlePrev]);

  async function onSubmit(data: PersonalDetailSchemaType) {
    try {
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

      const dataForm = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: data.birthDate,
        mobileNumber: "9876543210",
        permanentAddress: {
          countryId: 0,
          postCode: "12345",
          unit: "test",
          street: data.addressLine,
          city: data.city,
          state: "test state",
          address: data.addressLine,
        },
        temporaryAddress: {
          countryId: 0,
          postCode: "12345",
          unit: "test",
          street: data.addressLine,
          city: data.city,
          state: "test state",
          address: data.addressLine,
        },
        identityTypeId: 0,
        identityNo: data.documentNumber,
        identityIssuedDate: data.birthDate,
        identityIssuedBy: data.firstName,
        identityExpiryDate: data.documentExpiry,
        identityIssuedCountryId: 0,
        birthCountryId: 0,
        documents: [
          {
            documentTypeId: 0,
            documentUpload: JSON.stringify(documentFront),
          },
          {
            documentTypeId: 0,
            documentUpload: JSON.stringify(documentBack),
          },
        ],
      };
      console.log(JSON.stringify(dataForm));
      const res = await completeProfile(JSON.stringify(dataForm)).unwrap();

      console.log("This is the response:", res);
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  return (
    <section className="md:mt-7 px-5">
      <div className="flex items-center justify-center">
        <div className="md:max-w-[50rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />

          {/* ---------- FORM CONTAINER ---------- */}
          <FormProvider {...form}>
            <form
              className="w-full flex flex-col items-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
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

              <div className="w-full flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
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

              <div className="w-full flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
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

              <div className="w-full flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
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
      </div>
    </section>
  );
};

export default PersonalDetails;
