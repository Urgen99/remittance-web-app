import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { setAuthDetails } from "@/features/auth/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";

const PasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type PasswordSchema = z.infer<typeof PasswordSchema>;

const ChangePassword = ({ handleNext, handlePrev }: AccountPrivacyProps) => {
  const form = useForm<PasswordSchema>({
    resolver: zodResolver(PasswordSchema),
    mode: "all",
    defaultValues: {
      password: undefined,
    },
  });

  const dispatch = useDispatch();
  async function onSubmit(data: PasswordSchema) {
    await dispatch(setAuthDetails({ password: data.password }));
    handleNext("create-password");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full pt-4 pr-7 pb-6 flex flex-col justify-between"
      >
        <div className="flex flex-col gap-5">
          <TextContainer
            handlePrev={handlePrev}
            link="account-privacy"
            title="Change password"
            subtitle="To change your password, first you need to provide your old password and then only you can create new one"
          />

          <div className="max-w-[18.25rem] w-full">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]">
                        Password
                      </FormLabel>
                      <div className="flex flex-col gap-1 sm:gap-2 transition-all ease-in-out duration-300">
                        <FormControl>
                          <PasswordInput
                            {...field}
                            className="border-[#E6E6E6] pr-2 pl-3 h-10 rounded-[8px] shadow-[0_1.5px_4px_-1px_rgba(10,9,11,0.07)] font-inter text-sm tracking-[-0.05px] leading-5"
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-0.5 items-center font-roboto font-normal text-[15px] leading-[22px] tracking-[-1%]">
                <p className=" text-[#1B1B1B]">Forgot current password? </p>
                <Button
                  onClick={() => handleNext("reset-password-otp")}
                  variant="link"
                  className="text-[#3333C1] underline p-0"
                  type="button"
                >
                  reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pl-1">
          <Button
            type="submit"
            className="font-mukta font-medium leading-7 w-fit h-10 rounded-[4px] bg-[#3333c1] hover:bg-[#3333c1] !px-5 !py-3"
          >
            Continue <DialogSettingsIcons.ChevronRight fill="#fff" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePassword;
