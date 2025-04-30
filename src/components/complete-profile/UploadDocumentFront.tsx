/* eslint-disable @typescript-eslint/no-explicit-any */
import { setFormData } from "@/features/complete-profile/slice";
import { RootState } from "@/features/store";
import {
  DocumentFrontSchema,
  DocumentFrontSchemaType,
} from "@/lib/schemas/user/completeProfile";
import { FormDescription } from "@/lib/type";
import { readFileAsBase64 } from "@/utils/readFile";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormIcons } from "../icons/Icons";
import FormHeadingDescription from "../shared/FormHeadingDescription";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/file-upload";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
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

const UploadDocumentFront: React.FC<UploadDocumentFrontProps> = ({
  handleNext,
  handlePrev,
}) => {
  const { documentType, documentFront } = useSelector(
    (state: RootState) => state.userForm
  );
  const [files, setFiles] = useState<File[] | null>(
    documentFront ? [documentFront] : null
  );

  console.log(files);

  const methods = useForm<DocumentFrontSchemaType>({
    mode: "all",
    resolver: zodResolver(DocumentFrontSchema),
    defaultValues: {
      documentFront: documentFront,
    },
  });

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (files?.length) {
      methods.setValue("documentFront", files[0]);
    } else {
      methods.setValue("documentFront", undefined as unknown as File);
    }
  }, [files, methods]);

  useEffect(() => {
    if (!documentType) {
      handlePrev();
    }
  }, [documentType, handlePrev]);

  async function onSubmit(values: DocumentFrontSchemaType) {
    try {
      const base64 = await readFileAsBase64(values.documentFront);
      const documentFront = {
        name: values.documentFront.name,
        type: values.documentFront.type,
        base64,
      };

      dispatch(setFormData({ documentFront } as any));
      handleNext();
    } catch (e) {
      console.error("Error while reading file. Please try again.", e);
    }
  }

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
                name="documentFront"
                render={() => {
                  return (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          value={files}
                          onValueChange={setFiles}
                          dropzoneOptions={dropZoneConfig}
                          className="relative bg-background rounded-lg p-2"
                        >
                          <FileInput
                            id="documentFront"
                            className="outline-dashed outline-1 outline-slate-500 h-[11rem] flex items-center justify-center"
                          >
                            <div className="flex items-center justify-center flex-col p-8 w-full gap-2">
                              <div className="size-11 p-3 rounded-[8px] bg-[#f8f8f8] flex items-center justify-center">
                                <FormIcons.UploadFile />
                              </div>

                              <div className="flex flex-col gap-1 items-center">
                                <p className="mb-1 text-sm text-[#0A090B] font-[475] font-inter dark:text-gray-400 tracking-[-0.05px]">
                                  <span className="font-semibold ">
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

              <NavigationButtons onBackClick={handlePrev} type="submit" />
            </form>

            <DevTool control={methods.control} />
          </div>
        </FormProvider>
      </section>
    </main>
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
