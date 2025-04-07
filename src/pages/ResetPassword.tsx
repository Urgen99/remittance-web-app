import { FormIcons } from "@/components/icons/Icons";
import FormComponent from "@/components/shared/Generic/FormComponent";
import { CreatePasswordSchema } from "@/lib/formSchema";
import { createPasswordFields } from "@/lib/inputFields";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPassword = () => {
  const form = useForm<z.infer<typeof CreatePasswordSchema>>({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: createPasswordFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });
  function onSubmit(data: z.infer<typeof CreatePasswordSchema>) {
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
    <section className="mt-7">
      <div className="flex  items-center justify-center">
        <FormComponent
          form={form}
          fields={createPasswordFields}
          onSubmit={onSubmit}
          formDescription={formDescription}
          info={formDescription.info}
        />
      </div>
    </section>
  );
};

export default ResetPassword;

const formDescription: FormDescription = {
  Icon: FormIcons.Lock,
  title: "Forgot your password?",
  subtitle:
    "Forgot your password? No worries! Enter your email below, and we'll send you an OTP to reset your password securely.",
  info: [
    "Minimum 8 characters (Longer passwords are more secure)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one special character (!@#$%^&*) (Makes it harder to guess)",
  ],
};
