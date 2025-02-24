/* eslint-disable @typescript-eslint/no-explicit-any */
// import { toast } from "@/components/hooks/use-toast";

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

const FormComponent = ({ form, fields, onSubmit }: any) => {
  return (
    <section className="border-red-500 border-2 max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
      {/* ---------- FORM DESCRIPTION ---------- */}
      <div className="flex flex-col gap-6 items-center">
        {/* gradient bgackground */}
        <div
          // background: linear-gradient(314.64deg, #E2E2FF 7.27%, #FFFFFF 91.13%);
          className="border border-[#E2E2FF] bg-gradient-to-br from-[#FFFF] to-[#E2E2FF] size-[3.37rem] rounded-[8px] shadow-sm shadow-[#07073A0D]"
        >
          {/* <icon /> */}
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-center font-semibold font-general-sans text-2xl tracking-[-1%] text-[#0A090B]">
            Welcome to SwiftSend
          </h1>
          <h3 className="text-center font-inter tracking-[-0.18px] text-base text-[#696969]">
            Enjoy a seamless, hassle-free way to send money to Nepal with ease!
          </h3>
        </div>
      </div>

      {/* ---------- FORM CONTAINER ---------- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          {fields.map(
            (field: {
              name: string;
              label: string;
              type: string;
              placeholder?: string;
              isImportant?: boolean;
            }) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: inputFields }) => (
                  <FormItem>
                    <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                      {field.label}{" "}
                      {field.isImportant && (
                        <span className="text-[#D32F2F]">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={field.placeholder || ""}
                        {...inputFields}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default FormComponent;
