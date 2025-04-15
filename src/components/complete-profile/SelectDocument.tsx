import { setFormData } from "@/features/complete-profile/slice";
import {
  DocumentSelectSchema,
  DocumentSelectSchemaType,
} from "@/lib/schemas/user/completeProfile";
import { FormDescription } from "@/lib/type";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormIcons } from "../icons/Icons";
import FormHeadingDescription from "../shared/FormHeadingDescription";
import { FormField } from "../ui/form";
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
  },
  {
    Icon: FormIcons.License,
    title: "Drivers license verification",
    subtitle: "Upload your drivers license for quick identity verification.",
    documentType: "license",
  },
  {
    Icon: FormIcons.Passport,
    title: "National ID verification",
    subtitle: "Upload your national ID for quick identity verification.",
    documentType: "nationalId",
  },
];

const SelectDocument: React.FC<SelectDocumentProps> = ({ handleNext }) => {
  const form = useForm<DocumentSelectSchemaType>({
    mode: "all",
    resolver: zodResolver(DocumentSelectSchema),
    defaultValues: {
      type: "passport",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBack = () => {
    navigate("/", { replace: true });
  };

  const onSubmit = (data: DocumentSelectSchemaType) => {
    dispatch(setFormData({ documentType: data.type }));
    handleNext();
  };

  return (
    <main className="mt-7">
      <section className="flex flex-col gap-6 items-center justify-center">
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
              name="type"
              render={({ field: { value, onChange } }) => {
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {documents.map(
                      ({ Icon, title, subtitle, documentType }) => (
                        <div
                          key={documentType}
                          className={`cursor-pointer p-4 bg-[url('/images/upload.png')] lg:max-w-[16rem] w-full h-[10.5rem] bg-no-repeat bg-top rounded-[8px] border border-[#00000008] hover:border-[#3333C1] hover:bg-[#EBEBF9] flex justify-end relative ${
                            value === documentType &&
                            "border-[#3333C1] bg-[#EBEBF9]"
                          }`}
                          onClick={() => onChange(documentType)}
                        >
                          {value === documentType && (
                            <div className="absolute">
                              <FormIcons.CheckIcon />
                            </div>
                          )}

                          <div className="h-full flex flex-col justify-between">
                            <div className="w-fit p-2 flex justify-center items-center bg-[#EBEBF9] rounded-full">
                              <Icon />
                            </div>

                            <div className="select-none flex flex-col gap-3">
                              <h4 className="font-general-sans font-medium text-base leading-[20.8px] tracking-[-1%] text-[#1b1b1b]">
                                {title}
                              </h4>
                              <p className="font-roboto text-sm tracking-[-1%] text-[#696969] leading-[18px]">
                                {subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
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
      </section>
    </main>
  );
};

export default SelectDocument;
