import { UserFormSchema } from "@/lib/formSchema";
import { FormDescription } from "@/lib/type";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormIcons } from "../icons/Icons";
import FileUpload from "../shared/FileUpload";
import FormHeadingDescription from "../shared/FormHeadingDescription";

export interface UploadDocumentProps {
  handleNext: () => void;
  handlePrev: () => void;
  documentSide?: "front" | "back";
}

const documentUploadSchema = UserFormSchema.shape.document.pick({
  document_front: true,
  document_back: true,
});

export type DocumentUploadSchema = z.infer<typeof documentUploadSchema>;

const UploadDocument: React.FC<UploadDocumentProps> = ({
  handleNext,
  handlePrev,
  documentSide = "front",
}) => {
  const formDescription: FormDescription = {
    Icon: FormIcons.Folder,
    title: `Upload ${documentSide} side of document`,
    subtitle:
      "To comply with Australian government regulations and verify your status, you are required to submit an approved form of identification. Please select one from the options below.",
  };

  const methods = useForm<DocumentUploadSchema>({
    mode: "all",
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      document_front: undefined,
      document_back: undefined,
    },
  });

  return (
    <main className="mt-7">
      <section className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[40.75rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM SELECT ---------- */}
        <FormProvider {...methods}>
          <div className="max-w-[36.55rem] w-full flex justify-center flex-col gap-4">
            <FileUpload
              documentSide={documentSide}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
            <DevTool control={methods.control} />
          </div>
        </FormProvider>
      </section>
    </main>
  );
};

export default UploadDocument;
