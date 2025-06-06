import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import { useLazyEmailExistsQuery } from "@/features/auth/authApi.slice";
import { setUserEmail } from "@/features/users/users.slice";
import { EmailSchema, EmailSchemaType } from "@/lib/schemas/user/email";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const formDescription: FormDescription = {
  Icon: FormIcons.Upload,
  title: "Welcome to SwiftSend",
  subtitle:
    "Enjoy a seamless, hassle-free way to send money to Nepal with ease!",
};
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

  const [emailExists, { isLoading }] = useLazyEmailExistsQuery();
  async function onSubmit(formData: EmailSchemaType) {
    try {
      const response = await emailExists(formData.email).unwrap();

      if (response?.emailExits?.data) {
        dispatch(setUserEmail(formData.email));

        if (response?.emailExits?.data?.exists) {
          navigate("/login");
        } else {
          navigate("/create-password");
        }
      }
    } catch (e: any) {
      console.error("Error: ", e?.data?.message);
      // add alert later
    }
  }

  return (
    <main className="mt-7">
      <section className="flex items-center justify-center">
        <div className="px-3 sm:px-4 w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />

          {/* ---------- FORM CONTAINER ---------- */}
          <div className="flex flex-col gap-[18px] w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col"
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
                  className="text-xs sm:text-sm cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full h-11 text-white"
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] ">
              <ul className="p-3 bg-[#EBEBF9] text-[13px] rounded-[8px] flex flex-col gap-4">
                <li>
                  <p className="flex gap-1 sm:gap-[5px] text-xs sm:text-base">
                    <FormIcons.InfoFilled className="sm:mt-1" />
                    If you have an account, you will be prompted to login in the
                    next step.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
