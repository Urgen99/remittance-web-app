import { selectKycState, setKycData } from "@/features/kyc/kyc.slice";
import { KycSchema } from "@/lib/schemas/kyc/upload-kyc";
import { FormDescription } from "@/lib/type";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FormIcons } from "../../../../components/icons/Icons";
import FormHeadingDescription from "../../../../components/shared/FormHeadingDescription";
import { FormField } from "../../../../components/ui/form";
import NavigationButtons from "./NavigationButtons";
interface SelectDocumentProps {
  handleNext: () => void;
}

const formDescription: FormDescription = {
  Icon: FormIcons.Folder,
  title: "Select a document",
  subtitle:
    "To comply with Australian government regulations and verify your status, you are required to submit an approved form of identification. Please select one from the options below.",
};

const documents = [
  {
    Icon: FormIcons.Passport,
    title: "Passport Verification",
    subtitle: "Upload your passport image for quick identity verification.",
    documentType: "passport",
    documentId: 3,
  },
  {
    Icon: FormIcons.License,
    title: "Drivers license verification",
    subtitle: "Upload your drivers license for quick identity verification.",
    documentType: "license",
    documentId: 2,
  },
  {
    Icon: FormIcons.NationalId,
    title: "National ID verification",
    subtitle: "Upload your national ID for quick identity verification.",
    documentType: "nationalId",
    documentId: 1,
  },
];

const DocumentType = KycSchema.pick({
  identityTypeId: true,
});

type DocumentType = z.infer<typeof DocumentType>;

const SelectDocument = ({ handleNext }: SelectDocumentProps) => {
  const { identityTypeId } = useSelector(selectKycState);

  const form = useForm<DocumentType>({
    mode: "all",
    resolver: zodResolver(DocumentType),
    defaultValues: {
      identityTypeId: identityTypeId || undefined,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBack = () => {
    navigate("/", { replace: true });
  };

  const onSubmit = (data: DocumentType) => {
    dispatch(setKycData({ identityTypeId: data.identityTypeId }));
    handleNext();
  };

  return (
    <section className="md:mt-7 px-5">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[40.35rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM CONTAINER ---------- */}
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[50rem] w-full flex flex-col items-center gap-5"
          >
            <FormField
              name="identityTypeId"
              render={({ field: { value, onChange } }) => {
                return (
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {documents.map(
                      ({ Icon, title, subtitle, documentType, documentId }) => (
                        <article
                          key={documentType}
                          className={`cursor-pointer p-4 bg-[url('/images/upload.png')] md:max-w-[16rem] w-full h-[5.5rem] md:h-[10.5rem] bg-cover md:bg-auto bg-no-repeat bg-top rounded-[8px] border border-[#00000008] hover:border-[#3333C1] hover:bg-[#EBEBF9] flex md:justify-end relative ${
                            value === documentId &&
                            "border-[#3333C1] bg-[#EBEBF9]"
                          }`}
                          onClick={() => onChange(documentId)}
                        >
                          {value === documentId && (
                            <div className="absolute right-4 md:right-auto">
                              <FormIcons.CheckIcon />
                            </div>
                          )}

                          <div className="h-[38px] md:h-full flex md:flex-col md:justify-between gap-5 md:gap-0">
                            <div className="w-fit p-2 flex justify-center items-center bg-[#EBEBF9] rounded-full">
                              <Icon />
                            </div>

                            <div className="select-none flex flex-col gap-1.5 md:gap-3">
                              <h4 className="font-general-sans font-medium text-sm md:text-base leading-[20.8px] tracking-[-1%] text-[#1b1b1b]">
                                {title}
                              </h4>
                              <p className="font-roboto text-xs md:text-sm tracking-[-1%] text-[#696969] leading-[18px]">
                                {subtitle}
                              </p>
                            </div>
                          </div>
                        </article>
                      )
                    )}
                  </div>
                );
              }}
            />

            <NavigationButtons
              onBackClick={handleBack}
              disabled={!form.formState.isValid}
              type="submit"
            />
          </form>
          <DevTool control={form.control} />
        </FormProvider>
      </div>
    </section>
  );
};

export default SelectDocument;
