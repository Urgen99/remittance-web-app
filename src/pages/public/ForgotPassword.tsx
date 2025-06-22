import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import { setAuthDetails } from "@/features/auth/auth.slice";
import { useForgotPasswordMutation } from "@/features/auth/authApi.slice";
import useAuthState from "@/hooks/useAuthState";
import { EmailSchema, EmailSchemaType } from "@/lib/schemas/user/email";
import { FormDescription, ResponseError } from "@/lib/type";
import { showError, showSuccess } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  useAuthState();
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  async function onSubmit(formData: EmailSchemaType) {
    try {
      const response = await forgotPassword(formData.email).unwrap();

      if (response?.message) {
        dispatch(setAuthDetails({ email: formData.email }));
        showSuccess(
          "Success",
          "Please check your email. We have sent you an OTP to reset your password."
        );

        navigate("/verify-otp", {
          state: { verificationMode: "forgot-password" },
        });
      }
    } catch (e) {
      const { status } = e as ResponseError;

      if (!status) {
        showError("No Server Response", "Please try again later.");
      } else if (status === 400) {
        showError("Error!", "Please enter all the required fields.");
      } else {
        showError("Something went wrong!", "Please try again later.");
      }
    }
  }

  return (
    <section className="mt-7 px-5">
      <div className="flex items-center justify-center">
        <div className="max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />

          {/* ---------- FORM CONTAINER ---------- */}
          <div className="flex flex-col w-full gap-[18px]">
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
                  disabled={isLoading}
                  className="cursor-pointer text-xs sm:text-sm font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full h-11 text-white"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <Link
              to="/login"
              className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] underline"
              replace
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
