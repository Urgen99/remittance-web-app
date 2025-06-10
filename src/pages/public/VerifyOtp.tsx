import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  selectAuthEmail,
  selectAuthPassword,
  setCredentials,
} from "@/features/auth/auth.slice";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/features/auth/authApi.slice";
import useRouteGuard from "@/hooks/use-route-guard";
import { OTPSchema, OTPSchemaType } from "@/lib/schemas/user/verifyOtp";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOtp = () => {
  const email = useSelector(selectAuthEmail);
  const password = useSelector(selectAuthPassword);

  useRouteGuard({
    primaryCondition: email,
    secondaryCondition: password,
    navigateTo: "/register",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema),
    mode: "all",
    defaultValues: { otp: "" },
  });

  const [verifyOTP, { isLoading: otpLoading }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: resendOtpLoading }] = useResendOTPMutation();

  async function onSubmit(data: OTPSchemaType) {
    try {
      const credentials = {
        emailAddress: email,
        otpCode: data.otp,
        password,
      };

      const response = await verifyOTP(credentials).unwrap();

      if (response) {
        toast.success("Verification Successful", {
          description: "You are being redirected to the dashboard page.",
        });

        if (response?.data) {
          dispatch(setCredentials({ ...response?.data }));
          navigate("/test-protected");
        }
      }
    } catch (e: any) {
      console.error("error here", e);

      if (e?.status === 400 || e?.status === 401) {
        toast.error("Invalid OTP", {
          description: "Please enter a valid OTP.",
        });
      } else {
        toast.error("Verification Failed", {
          description: "Please try again later.",
        });
      }
    } finally {
      toast.dismiss();
    }
  }

  async function handleResendOTP() {
    try {
      const credentials = {
        emailAddress: email,
      };
      const response = await resendOTP(credentials).unwrap();

      if (response?.message) {
        toast.success("OTP sent successfully", {
          description: "Please check your email.",
        });
      }
    } catch (e: any) {
      console.error("Error from handle resend otp: ", e);

      if (e?.status === 400) {
        toast.error("Invalid Email", {
          description: "Please enter a valid email address.",
        });
      }
    }
  }

  return (
    <section className="mt-7 px-5">
      <div className="flex items-center justify-center">
        <div className="sm:max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}

          <FormHeadingDescription formDescription={formDescription} />

          {email}
          {password}
          <div className="flex flex-col gap-5 items-center">
            {/* ---------- FORM CONTAINER ---------- */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm:w-full flex flex-col items-center gap-[18px]"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormItem>
                  )}
                />
                <Button
                  className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] max-w-[29rem] w-full h-11 text-white"
                  type="submit"
                  disabled={otpLoading || resendOtpLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="flex flex-col gap-4 justify-between w-full">
              <Button
                variant="link"
                className="w-fit text-[#3333C1] font-inter font-[475] text-sm leading-[22px] tracking-[-0.18px] p-0"
                onClick={handleResendOTP}
                disabled={resendOtpLoading || otpLoading}
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;

const formDescription: FormDescription = {
  Icon: FormIcons.Lock,
  title: "Verify your otp",
  subtitle:
    "Forgot your password? No worries! Enter your email below, and we'll send you an OTP to reset your password securely.",
  links: {
    title: "Back to Login",
    to: "/login",
  },
};
