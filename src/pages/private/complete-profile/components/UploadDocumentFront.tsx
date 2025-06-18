import { useUploadDocumentMutation } from "@/features/documents/documentsApi.slice";
import { selectKycState, setKycData } from "@/features/kyc/kyc.slice";
import { FormDescription, ResponseError } from "@/lib/type";
import { showError, showSuccess } from "@/utils/toaster";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { FormIcons } from "../../../../components/icons/Icons";
import FormHeadingDescription from "../../../../components/shared/FormHeadingDescription";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "../../../../components/ui/file-upload";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import NavigationButtons from "./NavigationButtons";

interface UploadDocumentFrontProps {
  handleNext: () => void;
  handlePrev: () => void;
}

const formDescription: FormDescription = {
  Icon: FormIcons.Folder,
  title: "Upload front side of document",
  subtitle:
    "To comply with Australian government regulations and verify your status, you are required to submit an approved form of identification. Please select one from the options below.",
};

const DocumentUploadSchema = z.object({
  front: z.instanceof(File, { message: "Document front is required" }),
});
type DocumentUploadSchemaType = z.infer<typeof DocumentUploadSchema>;

const UploadDocumentFront = ({
  handleNext,
  handlePrev,
}: UploadDocumentFrontProps) => {
  const front = localStorage.getItem("front")
    ? [JSON.parse(localStorage.getItem("front") as string)]
    : null;
  const [files, setFiles] = useState<File[] | null>(front || null);
  const { identityTypeId } = useSelector(selectKycState);
  const methods = useForm<DocumentUploadSchemaType>({
    mode: "all",
    resolver: zodResolver(DocumentUploadSchema),
    defaultValues: {
      front: files ? files[0] : undefined,
    },
  });

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
  };
  const dispatch = useDispatch();
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  useEffect(() => {
    if (!identityTypeId) {
      handlePrev();
    }
  }, [identityTypeId, handlePrev, methods]);

  useEffect(() => {
    if (!identityTypeId) {
      handlePrev();
    }
  }, [identityTypeId, handlePrev]);

  async function onSubmit(formData: DocumentUploadSchemaType) {
    try {
      const myForm = new FormData();
      myForm.append("Data", formData.front);

      const response = await uploadDocument(myForm).unwrap();

      if (response) {
        const values = {
          documentTypeId: identityTypeId || 1,
          documentUpload: response?.data,
        };
        dispatch(setKycData({ documentFront: values }));
        localStorage.setItem("DOCUMENT_FRONT", JSON.stringify(formData.front));
        showSuccess("Success", "Document uploaded successfully");
        handleNext();
      }
    } catch (e) {
      const { status } = e as ResponseError;

      if (status === 400) {
        showError(
          "Invalid document!",
          "Please upload a valid document. Supported types: [JPG, JPEG, PNG]."
        );
      } else if (status === 401) {
        showError("Unauthorized", "Please login to access this resource.");
      } else {
        showError("Error", "Something went wrong. Please try again.");
      }
    }
  }

  return (
    <section className="md:mt-7 px-5">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[40.75rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM SELECT ---------- */}
        <FormProvider {...methods}>
          <div className="max-w-[36.55rem] w-full flex justify-center flex-col gap-4">
            <Tabs
              defaultValue="front"
              className="flex flex-col items-center gap-5 w-full"
            >
              <TabsList className="!w-fit rounded-full px-1 py-4 grid grid-cols-2 place-content-center !bg-white shadow-sm gap-2.5">
                {tabs.map(({ title, value }) => (
                  <TabsTrigger
                    disabled
                    key={value}
                    value={value}
                    className="font-inter font-[475] px-4 py-[6px] rounded-[20px] !w-full data-[state=active]:!bg-[#3333C1] data-[state=active]:!text-white !bg-[#f7f7f7] !text-sm !text-black disabled:!bg-transparent"
                  >
                    {title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={methods.control}
                name="front"
                render={() => {
                  return (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          value={files}
                          onValueChange={(newFiles) => {
                            setFiles(newFiles);
                            methods.setValue(
                              "front",
                              newFiles?.[0] || (null as unknown as File)
                            );
                            methods.trigger("front");
                          }}
                          dropzoneOptions={dropZoneConfig}
                          className="relative bg-background rounded-lg p-2"
                        >
                          <FileInput
                            id="front"
                            className="outline-dashed outline-1 outline-slate-500 h-[11rem] flex items-center justify-center"
                          >
                            <div className="flex items-center justify-center flex-col p-8 w-full gap-2">
                              <div className="size-11 p-3 rounded-[8px] bg-[#f8f8f8] flex items-center justify-center">
                                <FormIcons.UploadFile />
                              </div>

                              <div className="flex flex-col gap-1 items-center">
                                <p className="mb-1 text-sm text-[#0A090B] font-[475] font-inter dark:text-gray-400 tracking-[-0.05px]">
                                  <span className="font-semibold">
                                    Drag & drop files or
                                  </span>
                                  <span className="text-[#1751D0]">
                                    {" "}
                                    browse files
                                  </span>
                                </p>
                                <p className="font-inter text-xs text-[#4F4D55">
                                  JPG, PNG or GIF - Max file size 2MB
                                </p>
                              </div>
                            </div>
                          </FileInput>
                          {files && files.length > 0 && (
                            <FileUploaderContent className="flex-col gap-2">
                              {files.map((file, i) => (
                                <FileUploaderItem key={file.name} index={i}>
                                  <FormIcons.InfoFilled />
                                  <span className="text-[13px] text-[#3333C1] leading-[18px] ">
                                    {file.name}
                                  </span>
                                </FileUploaderItem>
                              ))}
                            </FileUploaderContent>
                          )}
                        </FileUploader>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <NavigationButtons
                onBackClick={handlePrev}
                type="submit"
                disabled={isLoading}
              />
            </form>

            <DevTool control={methods.control} />
          </div>
        </FormProvider>
      </div>
    </section>
  );
};

export default UploadDocumentFront;

const tabs = [
  {
    title: "Document Front",
    value: "front",
  },
  {
    title: "Document Back",
    value: "back",
  },
];
