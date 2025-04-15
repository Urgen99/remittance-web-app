import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import {
  CreatePasswordSchema,
  CreatePasswordSchemaType,
} from "@/lib/schemas/user/createPassword";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CreatePassword = () => {
  const form = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(CreatePasswordSchema),
    mode: "all",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  function onSubmit(data: CreatePasswordSchemaType) {
    console.log("form is submitted", data);

    alert({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <main className="mt-7">
      <section className="flex items-center justify-center">
        <div className="max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />

          {/* ---------- FORM CONTAINER ---------- */}
          <div className="space-y-[18px] w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col"
              >
                <TextInput
                  control={form.control}
                  name="newPassword"
                  label="New Password"
                  isImportant
                  placeholder="*********************"
                  key="newPassword"
                  type="password"
                />

                <TextInput
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm new Password"
                  isImportant
                  placeholder="*********************"
                  key="confirmPassword"
                  type="password"
                />

                <Button
                  type="submit"
                  className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] ">
              {formDescription.info && (
                <div className="p-3 bg-[#EBEBF9] text-[13px] rounded-[8px] flex flex-col gap-4">
                  {formDescription.info.map((item: string) => (
                    <p key={item} className="flex gap-[5px] items-center">
                      <FormIcons.InfoFilled />
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreatePassword;

const formDescription: FormDescription = {
  Icon: FormIcons.Upload,
  title: "Create password",
  subtitle: "Create a secure password for your system.",
  info: [
    "Minimum 8 characters (Longer passwords are more secure)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one special character (!@#$%^&*) (Makes it harder to guess)",
  ],
};
