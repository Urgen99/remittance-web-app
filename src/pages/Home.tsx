import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import { setEmail } from "@/features/auth/auth.slice";
import { EmailSchema, EmailSchemaType } from "@/lib/schemas/user/email";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data: EmailSchemaType) {
    dispatch(setEmail(data.email));
    navigate("/login");
  }

  return (
    <main className="mt-7">
      <section className="flex items-center justify-center">
        <div className="px-3 sm:px-4 sm:max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />

          {/* ---------- FORM CONTAINER ---------- */}
          <div className="space-y-[18px] w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-1"
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
                  className="text-xs sm:text-sm cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] ">
              <div className="p-3 bg-[#EBEBF9] text-[13px] rounded-[8px] flex flex-col gap-4">
                <p className="flex gap-[5px] items-center text-sm sm:text-base">
                  <FormIcons.InfoFilled />
                  If you have an account , you will be prompted to login in the
                  next step
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

const formDescription: FormDescription = {
  Icon: FormIcons.Upload,
  title: "Welcome to SwiftSend",
  subtitle:
    "Enjoy a seamless, hassle-free way to send money to Nepal with ease!",
};
