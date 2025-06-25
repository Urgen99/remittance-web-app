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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import UpdatePinSchema, { UpdatePinSchemaType } from "@/lib/schemas/user/pin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextContainer from "../TextContainer";
import { useUpdatePinMutation } from "@/features/users/userApi.slice";
import { showError, showSuccess } from "@/utils/toaster";
import { ResponseError } from "@/lib/type";

const UpdatePin = ({ handlePrev }: { handlePrev: (args: string) => void }) => {
  const form = useForm<UpdatePinSchemaType>({
    resolver: zodResolver(UpdatePinSchema),
    mode: "all",
    defaultValues: {
      oldPin: "",
      newPin: undefined,
      confirmPin: undefined,
    },
  });

  const [updatePin, { isLoading }] = useUpdatePinMutation();

  async function onSubmit(data: UpdatePinSchemaType) {
    try {
      const credentials = {
        oldPin: data.oldPin,
        newPin: data.newPin,
      };

      const response = await updatePin(credentials).unwrap();

      if (response) {
        showSuccess("Success", "You have successfully updated your pin.");
        handlePrev("account-privacy");
      }
    } catch (error) {
      const { data, status } = error as ResponseError;

      if (data?.message && data?.validationErrors?.length) {
        data.validationErrors.forEach(({ errorMessage }) => {
          showError("Error!", errorMessage);
        });
      }

      if (data?.message && !data?.validationErrors) {
        showError("Error!", data?.message);
      }

      if (status === 401) {
        showError(
          "Unauthorized!",
          "You are not authorized to perform this action."
        );
      } else if (status === 500) {
        showError("Something went wrong!", "Please try again.");
      }
    }
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
            title="Change pin"
            subtitle="To change your pin, first you need to provide your old pin and then only you can create new one"
          />

          <div className="max-w-[31.25rem] w-full">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-4 w-full max-w-[18.25rem] ">
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="oldPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="oldPin"
                          className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                        >
                          Enter current PIN
                        </FormLabel>

                        <div className="flex flex-col gap-1 sm:gap-2 transition-all ease-in-out duration-300">
                          <FormControl>
                            <InputOTP
                              maxLength={4}
                              {...field}
                              id="oldPin"
                              className="text-[#7F7D83] font-inter font-normal text-sm leading-5 tracking-[-0.05px]"
                            >
                              <InputOTPGroup className="gap-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                  <InputOTPSlot
                                    className="!h-12 bg-[#F7F7F7] shadow-xs border border-[#E0E0E0]"
                                    key={index}
                                    index={index}
                                    aria-placeholder="-"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="newPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="newPin"
                          className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                        >
                          Enter new PIN
                        </FormLabel>

                        <div className="flex flex-col gap-1 sm:gap-2 transition-all ease-in-out duration-300">
                          <FormControl>
                            <InputOTP
                              maxLength={4}
                              {...field}
                              id="newPin"
                              className="text-[#7F7D83] font-inter font-normal text-sm leading-5 tracking-[-0.05px]"
                            >
                              <InputOTPGroup className="gap-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                  <InputOTPSlot
                                    className="!h-12 bg-[#F7F7F7] shadow-xs border border-[#E0E0E0]"
                                    key={index}
                                    index={index}
                                    aria-placeholder="-"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
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
                    name="confirmPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="confirmPin"
                          className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                        >
                          Confirm new PIN
                        </FormLabel>

                        <div className="flex flex-col gap-1 sm:gap-2 transition-all ease-in-out duration-300">
                          <FormControl>
                            <InputOTP
                              maxLength={4}
                              {...field}
                              id="confirmPin"
                              className="text-[#7F7D83] font-inter font-normal text-sm leading-5 tracking-[-0.05px]"
                            >
                              <InputOTPGroup className="gap-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                  <InputOTPSlot
                                    className="!h-12 bg-[#F7F7F7] shadow-xs border border-[#E0E0E0]"
                                    key={index}
                                    index={index}
                                    aria-placeholder="-"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <p className="font-roboto font-normal text-sm leading-[22px] tracking-[-1%] text-[#1B1B1B]">
                Make sure you don't use concurrent numbers such as 1234 or
                similar number 1122 or 2244
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-full bg-[#EBEBF9] size-7">
              <DialogSettingsIcons.ArrowUpRight />
            </div>
            <p className="text-[#696969] font-roboto font-normal text-sm leading-[18px] tracking-[-1%]">
              Don't share your transaction pin with anyone, never, no{" "}
            </p>
          </div>

          <div className="pl-1">
            <Button
              disabled={!form.formState.isValid || isLoading}
              className="font-mukta font-medium leading-7 w-fit h-10 rounded-[4px] bg-[#3333c1] hover:bg-[#3333c1] !px-5 !py-3 disabled:cursor-not-allowed disabled:bg-black"
            >
              Continue <DialogSettingsIcons.ChevronRight fill="#fff" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePin;
