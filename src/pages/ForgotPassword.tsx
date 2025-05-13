import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import { EmailSchema, EmailSchemaType } from "@/lib/schemas/user/email";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(data: EmailSchemaType) {
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
    <section className="mt-7 px-5">
      <div className="flex items-center justify-center">
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
                <TextInput
                  control={form.control}
                  name="email"
                  label="Email Address"
                  isImportant
                  placeholder="Enter email address"
                  key="email"
                  type="email"
                />

                <Button
                  type="submit"
                  className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <Link
              to="/login"
              className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

const formDescription: FormDescription = {
  Icon: FormIcons.Lock,
  title: "Forgot your password?",
  subtitle:
    "Forgot your password? No worries! Enter your email below, and we'll send you an OTP to reset your password securely.",
};
