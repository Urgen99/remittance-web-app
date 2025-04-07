import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
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
import { LoginFormSchema } from "@/lib/formSchema";
import { loginFields } from "@/lib/inputFields";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const Login = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: loginFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });
  function onSubmit(data: z.infer<typeof LoginFormSchema>) {
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
                className="w-full flex flex-col gap-[18px]"
              >
                <FormField
                  key="password"
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter font-[475] text-sm tracking-[-0.05px]">
                        Password
                        <span className="text-[#D32F2F]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********************"
                          {...field}
                          className="border-[#7f7d8356] shadow-sm font-inter placeholder:text-[#7F7D83]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="flex flex-col gap-3 font-inter font-medium text-sm leading-5 tracking-[-0.02px] text-[#0A090B]">
              <Button variant="outline" className="">
                <FormIcons.Google /> <span>Sign in with Google</span>
              </Button>
              <Button variant="outline" className="">
                <FormIcons.Apple /> <span>Sign in with Apple</span>
              </Button>
            </div>

            <Link
              to="/forgot-password"
              className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

const formDescription: FormDescription = {
  Icon: FormIcons.Upload,
  title: "Login to SwiftSend",
  subtitle:
    "We've found this email on our system , meaning its already registered with us , so you can just login with us",
};
