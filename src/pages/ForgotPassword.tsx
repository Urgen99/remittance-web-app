import { FormIcons } from "@/components/icons/Icons";
import FormComponent from "@/components/shared/Generic/FormComponent";
import { ForgotPasswordSchema } from "@/lib/formSchema";
import { forgotPasswordFields } from "@/lib/inputFields";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: forgotPasswordFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });
  function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
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
      <section className="flex  items-center justify-center">
        <FormComponent
          form={form}
          fields={forgotPasswordFields}
          onSubmit={onSubmit}
          formDescription={formDescription}
          links={formDescription.links}
        />
      </section>
    </main>
  );
};

export default ForgotPassword;

const formDescription: FormDescription = {
  Icon: FormIcons.Lock,
  title: "Forgot your password?",
  subtitle:
    "Forgot your password? No worries! Enter your email below, and we'll send you an OTP to reset your password securely.",
  links: {
    title: "Back to Login",
    to: "/login",
  },
};
