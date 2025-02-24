import FormComponent from "@/components/shared/Generic/FormComponent";
import { FormSchema } from "@/lib/formSchema";
import { loginFields } from "@/lib/inputFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: loginFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <main className="mt-7 mb-[13.5rem] border-red-500 border-2">
      <section className="flex items-center justify-center">
        <FormComponent form={form} fields={loginFields} onSubmit={onSubmit} />
      </section>
    </main>
  );
};

export default Login;
