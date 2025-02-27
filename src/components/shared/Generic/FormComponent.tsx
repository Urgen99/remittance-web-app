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
import FormHeadingDescription from "../FormHeadingDescription";

const FormComponent = <T extends z.ZodTypeAny>({
  form,
  fields = [],
  onSubmit,
  formDescription,
  links,
  info,
}: FormComponentProps<T>) => {
  return (
    <section className="max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
      {/* ---------- FORM DESCRIPTION ---------- */}
      <FormHeadingDescription formDescription={formDescription} />

      {/* ---------- FORM CONTAINER ---------- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-[18px]"
        >
          {fields.map((inputField) => (
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
          ))}

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
