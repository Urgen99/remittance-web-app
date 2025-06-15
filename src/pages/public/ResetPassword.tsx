import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import { selectAuthEmail } from "@/features/auth/auth.slice";
import { useResetPasswordMutation } from "@/features/auth/authApi.slice";
import useRouteGuard from "@/hooks/use-route-guard";
import {
  CreatePasswordSchema,
  CreatePasswordSchemaType,
} from "@/lib/schemas/user/createPassword";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const { state } = useLocation();
  const { otpCode } = (state as { otpCode: string }) || {};
  const email = useSelector(selectAuthEmail);

  useRouteGuard({
    primaryCondition: email,
    secondaryCondition: otpCode,
    navigateTo: "/register",
  });

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: CreatePasswordSchemaType) {
    try {
      const credentials = {
        userName: email,
        password: data.newPassword,
        confirmationCode: otpCode,
      };

      const response = await resetPassword(credentials).unwrap();

      if (response?.message) {
        toast.success(response?.message || "Password reset successfully");
        navigate("/register");
      }
    } catch (e) {
      console.log("Error", e);
      if (e instanceof Error) {
        toast.error(e?.message || "Something went wrong. Please try again.");
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
          <div className="space-y-[18px] w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col"
              >
                <TextInput
                  control={form.control}
                  name="newPassword"
                  label="New Password"
                  isImportant
                  placeholder="*********************"
                  key="newPassword"
                  type="password"
                />

                <TextInput
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm new Password"
                  isImportant
                  placeholder="*********************"
                  key="confirmPassword"
                  type="password"
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full h-11 text-white"
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] ">
              {formDescription.info && (
                <ul className="p-3 bg-[#EBEBF9] text-[13px] rounded-[8px] flex flex-col gap-4">
                  {formDescription.info.map((item: string) => (
                    <li key={item + Math.random()}>
                      <p className="flex gap-1 sm:gap-[5px] text-xs sm:text-base">
                        <FormIcons.InfoFilled className="sm:mt-1" />
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

const formDescription: FormDescription = {
  Icon: FormIcons.Lock,
  title: "Reset your password?",
  subtitle:
    "Reset your password easily! Enter your new password below to regain access to your account securely.",
  info: [
    "Minimum 8 characters (Longer passwords are more secure)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one special character (!@#$%^&*) (Makes it harder to guess)",
  ],
};
