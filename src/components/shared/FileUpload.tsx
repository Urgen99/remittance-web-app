import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormIcons } from "../icons/Icons";

interface FileUploadProps {
  documentSide?: "front" | "back";
}
const formSchema = z.object({
  name_0897061406: z.string().optional(),
});
const FileUpload: React.FC<FileUploadProps> = ({ documentSide = "front" }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  return (
    <>
      <Tabs
        defaultValue={documentSide}
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="name_0897061406"
            render={() => (
              <FormItem>
                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput
                      id="fileInput"
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
                      <FileUploaderContent>
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
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default FileUpload;

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
