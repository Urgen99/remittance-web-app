import { FormIcons } from "@/components/icons/Icons";
import FormComponent from "@/components/shared/Generic/FormComponent";
import { RegisterFormSchema } from "@/lib/formSchema";
import { registerFields } from "@/lib/inputFields";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Register = () => {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: registerFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });
  function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
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
          fields={registerFields}
          onSubmit={onSubmit}
          formDescription={formDescription}
          info={formDescription.info}
        />
      </div>
    </section>
  );
};

export default Register;

const formDescription: FormDescription = {
  Icon: FormIcons.Upload,
  title: "Welcome to SwiftSend",
  subtitle:
    "Enjoy a seamless, hassle-free way to send money to Nepal with ease!",
  info: [
    "If you have an account , you will be prompted to login in the next step",
  ],
};
