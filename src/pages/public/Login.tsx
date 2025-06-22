import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import {
  selectAuthEmail,
  setAuthDetails,
  setCredentials,
} from "@/features/auth/auth.slice";
import { useLoginMutation } from "@/features/auth/authApi.slice";
import useRouteGuard from "@/hooks/use-route-guard";
import {
  PasswordSchema,
  PasswordSchemaType,
} from "@/lib/schemas/user/password";
import { FormDescription, ResponseError } from "@/lib/type";
import { showError, showSuccess, showWarning } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useSelector(selectAuthEmail);

  useRouteGuard({ primaryCondition: email, navigateTo: "/" });

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
        username: email as string,
        password: data.password,
      }).unwrap();

      if (response.data) {
        dispatch(setAuthDetails({ password: data.password }));

        if (!response.data.isVerified) {
          showWarning(
            "Email not verified.",
            "Please verify your email before continuing."
          );
          navigate("/verify-otp", { state: { verificationMode: "auth" } });
        } else {
          dispatch(setCredentials({ ...response.data }));
          if (!response.data.isKycCompleted) {
            showWarning(
              "KYC not verified.",
              "Please verify your KYC before continuing."
            );
            navigate("/complete-profile");
          } else {
            navigate("/dashboard");
            showSuccess("Successfully Logged in", "You are logged in now");
          }
        }
      }
    } catch (e) {
      const { status } = e as ResponseError;

      if (!status) {
        showError("No Server Response", "Please try again later.");
      } else if (status === 400) {
        showError("Invalid Credentials", "Please enter correct details.");
      } else if (status === 401) {
        showError(
          "Unauthorized",
          "You are not authorized to perform this action."
        );
      } else {
        showError("Something went wrong!", "Please try again later.");
      }
    }
  }

  function handleForgotPassword() {
    navigate("/forgot-password");
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
                  disabled={isLoading}
                  className="cursor-pointer text-xs sm:text-sm font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full h-11 text-white"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="flex flex-col gap-3 font-inter font-medium leading-5 tracking-[-0.02px] text-[#0A090B]">
              <Button variant="outline" className="h-10" disabled={isLoading}>
                <FormIcons.Google />{" "}
                <p className="text-xs sm:text-sm">Sign in with Google</p>
              </Button>
              <Button variant="outline" className="h-10" disabled={isLoading}>
                <FormIcons.Apple />{" "}
                <p className="text-xs sm:text-sm">Sign in with Apple</p>
              </Button>
            </div>

            <Button
              variant="link"
              disabled={isLoading}
              onClick={handleForgotPassword}
              className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] underline w-fit"
            >
              Forgot Password?
            </Button>
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
