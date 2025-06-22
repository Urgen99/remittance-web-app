import { setCredentials } from "@/features/auth/auth.slice";
import { clearKycData, selectKycState } from "@/features/kyc/kyc.slice";
import { useSubmitKycMutation } from "@/features/kyc/kycApi.slice";
import { loadAuthState } from "@/lib/storage";
import { AuthResponse, FormDescription, ResponseError } from "@/lib/type";
import { showError, showSuccess } from "@/utils/toaster";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
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
    value: 3,
    label: "Passport",
  },
  {
    value: 2,
    label: "Driving License",
  },
  {
    value: 1,
    label: "National Id",
  },
];

const PersonalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.optional(z.string()),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Birth date is required" })
  ),
  identityTypeId: z.union([
    z.literal(1), // 1 National ID
    z.literal(2), // 2 License
    z.literal(3), // 3 Passport
  ]),
  identityNo: z.string().min(1, "Identity number is required"),
  identityExpiryDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Expiry date is required" })
  ),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});

type PersonalDetailsSchema = z.infer<typeof PersonalDetailsSchema>;

const PersonalDetails = ({ handlePrev }: PersonalDetailProps) => {
  const { identityTypeId, documentFront, documentBack } =
    useSelector(selectKycState);

  const dispatch = useDispatch();
  const form = useForm<PersonalDetailsSchema>({
    mode: "all",
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: {
      firstName: "",
      middleName: undefined,
      lastName: undefined,
      dateOfBirth: undefined,
      identityTypeId: identityTypeId || undefined,
      identityNo: undefined,
      identityExpiryDate: undefined,
    },
  });

  const [submitKyc, { isLoading }] = useSubmitKycMutation();

  useEffect(() => {
    if (identityTypeId && !documentFront && !documentBack) {
      handlePrev();
    }
  }, [identityTypeId, documentFront, documentBack, handlePrev]);

  async function onSubmit(data: PersonalDetailsSchema) {
    try {
      const formData = {
        ...data,
        dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
        mobileNumber: "9876543210",
        birthCountryId: 1,
        permanentAddress: {
          city: data.city,
          address: data.address,
          countryId: 1,
          postCode: "12345",
          unit: "test unit",
          street: "test street",
          state: "test state",
        },
        temporaryAddress: {
          city: data.city,
          address: data.address,
          countryId: 1,
          postCode: "12345",
          unit: "test unit",
          street: "test street",
          state: "test state",
        },
        documents: [documentFront, documentBack],
        identityIssuedBy: data.firstName,
        identityIssuedDate: "2023-01-01",
        identityExpiryDate: format(data.identityExpiryDate, "yyyy-MM-dd"),
        identityIssuedCountryId: 1,
      };

      const res = await submitKyc(formData).unwrap();

      if (res) {
        showSuccess(
          "KYC submitted successfully.",
          "You are being redirected to the dashboard."
        );
        dispatch(clearKycData());
        dispatch(
          setCredentials({
            ...loadAuthState(),
            isKycCompleted: true,
          } as AuthResponse)
        );
      }
    } catch (e) {
      const { status } = e as ResponseError;

      if (status === 400) {
        showError("Invalid details", "Please enter valid details.");
      } else if (status === 401) {
        showError(
          "Unauthorized",
          "Please login again to access this resource."
        );
      } else {
        showError("Something went wrong", "Please try again later.");
      }
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
                  name="dateOfBirth"
                  label="Select your birth date"
                  isImportant
                  form={form}
                />

                <div className="flex-1">
                  <DropDownSelect
                    name="identityTypeId"
                    label="Document Type"
                    control={form.control}
                    isImportant
                    defaultValue={identityTypeId?.toString()}
                    items={documentItems}
                    placeholder="Select Document Type"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
                <TextInput
                  name="identityNo"
                  label="Document Number"
                  isImportant
                  placeholder="Eg: 123456"
                  control={form.control}
                />

                <DatePicker
                  name="identityExpiryDate"
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
                  name="address"
                  label="Enter the address line"
                  isImportant
                  placeholder="Eg:Bhaktpur, Jadibuti"
                  control={form.control}
                />
              </div>

              <NavigationButtons
                type="submit"
                onBackClick={handlePrev}
                disabled={
                  isLoading
                  // !form.formState.isValid
                }
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
