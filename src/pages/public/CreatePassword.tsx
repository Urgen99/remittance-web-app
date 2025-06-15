import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/ui/forms/TextInput";
import { selectAuthEmail, setAuthDetails } from "@/features/auth/auth.slice";
import { useRegisterMutation } from "@/features/auth/authApi.slice";
import useRouteGuard from "@/hooks/use-route-guard";
import {
  CreatePasswordSchema,
  CreatePasswordSchemaType,
} from "@/lib/schemas/user/createPassword";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreatePassword = () => {
  const email = useSelector(selectAuthEmail);
  useRouteGuard({ primaryCondition: email, navigateTo: "/register" });

  const form = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(CreatePasswordSchema),
    mode: "all",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(data: CreatePasswordSchemaType) {
    try {
      const credentials = {
        emailAddress: email,
        password: data.newPassword,
        userType: 0,
      };

      const response = await register(credentials).unwrap();

      if (response?.message) {
        toast.success("User Created", {
          description: `${response?.message}`,
        });
        dispatch(setAuthDetails({ password: data.newPassword }));
        navigate("/verify-otp", { state: { verificationMode: "auth" } });
      }
    } catch (e) {
      console.error("Error: ", e);
    } finally {
      toast.dismiss();
    }
  }

  return (
    <section className="mt-7 px-5">
      <div className="flex items-center justify-center">
        <div className="max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
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
                  className="h-11 text-white cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] w-full"
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="text-[#3333C1] text-sm font-medium font-inter tracking-[-1%] ">
              {formDescription.info && (
                <ul className="p-3 bg-[#EBEBF9] text-[13px] rounded-[8px] flex flex-col gap-4">
                  {formDescription.info.map((item: string) => (
                    <li key={Math.random()}>
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

export default CreatePassword;

const formDescription: FormDescription = {
  Icon: FormIcons.Upload,
  title: "Create password",
  subtitle: "Create a secure password for your system.",
  info: [
    "Minimum 8 characters (Longer passwords are more secure)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one uppercase letter (A-Z) (Enhances complexity)",
    "At least one special character (!@#$%^&*) (Makes it harder to guess)",
  ],
};
