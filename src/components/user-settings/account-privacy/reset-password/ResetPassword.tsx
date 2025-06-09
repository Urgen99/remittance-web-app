import {
  CreatePasswordSchema,
  CreatePasswordSchemaType,
} from "@/lib/schemas/user/createPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextContainer from "../TextContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { DialogSettingsIcons } from "@/components/icons/Icons";

const ResetPassword = ({
  handlePrev,
}: {
  handlePrev: (args: string) => void;
}) => {
  const form = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(CreatePasswordSchema),
    mode: "all",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: CreatePasswordSchemaType) {
    console.log("form is submitted", formData);
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
            link="update-password"
            title="Reset password"
            subtitle="Otp verified , please reset your password below , make sure you follow the password guideline"
          />

          <div className="max-w-[31.25rem] w-full">
            <div className="flex flex-col gap-3">
              <div className="max-w-[18.25rem] w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]">
                          Enter new password
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

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]">
                          Confirm new password
                        </FormLabel>
                        <div className="flex flex-col gap-1 ">
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
              </div>
              <p className="font-roboto font-normal text-[15px] leading-[22px] tracking-[-1%] text-[#1B1B1B]">
                Password must be at least <u>8 word length</u> and must contain
                a <u>special character #,$,@</u>
              </p>
            </div>
          </div>
        </div>
        <div className="pl-1">
          <Button
            // disabled={isLoading}
            className="font-mukta font-medium leading-7 w-fit h-10 rounded-[4px] bg-[#3333c1] hover:bg-[#3333c1] !px-5 !py-3"
          >
            Continue <DialogSettingsIcons.ChevronRight fill="#fff" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPassword;
