import { FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OTPSchema } from "@/lib/schemas/user/verifyOtp";
import { Control } from "react-hook-form";
import { z } from "zod";

const OTPForm = ({ control }: OTPProps) => {
  return (
    <FormField
      control={control}
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
    ></FormField>
  );
};

export default OTPForm;

type OTPProps = {
  control: Control<z.infer<typeof OTPSchema>>;
};
