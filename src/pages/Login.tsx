import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import { setCredentials } from "@/features/auth/auth.slice";
import { useLoginMutation } from "@/features/auth/authApi.slice";
import { selectCurrentEmail } from "@/features/users/users.slice";
import {
  PasswordSchema,
  PasswordSchemaType,
} from "@/lib/schemas/user/password";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const email = useSelector(selectCurrentEmail);
  console.log("Current email is here", email);
  const form = useForm<PasswordSchemaType>({
    mode: "all",
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(data: PasswordSchemaType) {
    try {
      const response = await login({
        username: email,
        password: data.password,
      }).unwrap();

      if (response.data) {
        dispatch(setCredentials({ ...response.data }));

        console.log(JSON.stringify(response));
        navigate("/test-protected");
        toast.success("Successfully Logged in", {
          description: "You are logged in now",
        });
      }
    } catch (e: any) {
      if (!e.status) {
        console.log("No server response error: ", e);
        toast.error("No Server Response");
      } else if (e.status === 400) {
        toast.error("Invalid Credentials");
      } else if (e.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  }

  return (
    <section className="mt-7">
      <section className="flex items-center justify-center">
        <div className="px-3 sm:px-4 sm:max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
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
                  name="password"
                  label="Password"
                  isImportant
                  placeholder="*********************"
                  key="password"
                  type="password"
                />

                <Button
                  type="submit"
                  className="cursor-pointer text-xs sm:text-sm font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full h-11 text-white"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="flex flex-col gap-3 font-inter font-medium leading-5 tracking-[-0.02px] text-[#0A090B]">
              <Button variant="outline" className="h-10">
                <FormIcons.Google />{" "}
                <p className="text-xs sm:text-sm">Sign in with Google</p>
              </Button>
              <Button variant="outline" className="h-10">
                <FormIcons.Apple />{" "}
                <p className="text-xs sm:text-sm">Sign in with Apple</p>
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
    </section>
  );
};

export default Login;

const formDescription: FormDescription = {
  Icon: FormIcons.Upload,
  title: "Login to SwiftSend",
  subtitle:
    "We've found this email on our system , meaning its already registered with us , so you can just login with us",
};
