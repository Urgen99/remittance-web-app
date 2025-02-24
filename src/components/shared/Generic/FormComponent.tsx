// import { toast } from "@/components/hooks/use-toast";

import { FormIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormComponentProps } from "@/lib/interface";
import { Link } from "react-router-dom";
import { z } from "zod";
import OTPForm from "../OTPForm";

const FormComponent = <T extends z.ZodTypeAny>({
  form,
  fields,
  onSubmit,
  formDescription,
  links,
  info,
  isOTPForm = false,
}: FormComponentProps<T>) => {
  return (
    <section className="max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
      {/* ---------- FORM DESCRIPTION ---------- */}
      <div className="flex flex-col gap-6 items-center">
        <div className="border border-[#E2E2FF] bg-gradient-to-br from-[#FFFF] to-[#E2E2FF] size-[3.37rem] rounded-[12px] shadow-sm shadow-[#07073A0D] flex items-center justify-center">
          <formDescription.Icon />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-center font-semibold font-general-sans text-2xl tracking-[-1%] text-[#0A090B]">
            {formDescription.title}
          </h1>
          <h3 className="text-center font-inter tracking-[-0.18px] text-base text-[#696969]">
            {formDescription.subtitle}
          </h3>
        </div>
      </div>

      {/* ---------- FORM CONTAINER ---------- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-[18px]"
        >
          {isOTPForm ? (
            <OTPForm />
          ) : (
            fields.map((inputField) => (
              <FormField
                key={inputField.name}
                control={form.control}
                name={inputField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                      {inputField.label}{" "}
                      {inputField.isImportant && (
                        <span className="text-[#D32F2F]">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={inputField.type}
                        placeholder={inputField.placeholder || ""}
                        {...field}
                        className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))
          )}

          <Button
            type="submit"
            className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full"
          >
            Submit
          </Button>

          <div className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] ">
            {info && (
              <div className="p-3 bg-[#EBEBF9] text-[13px] rounded-[8px] flex flex-col gap-4">
                {info.map((item: string) => (
                  <p key={item} className="flex gap-[5px] items-center">
                    <FormIcons.InfoFilled />
                    {item}
                  </p>
                ))}
              </div>
            )}

            {links && (
              <Link to={links.to} className="underline">
                {links.title}
              </Link>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default FormComponent;
