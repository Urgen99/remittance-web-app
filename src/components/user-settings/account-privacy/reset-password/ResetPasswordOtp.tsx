import { SetStateAction, useState } from "react";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { DialogSettingsIcons } from "@/components/icons/Icons";

const ResetPasswordOtp = ({ handleNext, handlePrev }: AccountPrivacyProps) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="h-full pb-6 pt-4 pr-7 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <TextContainer
          handlePrev={handlePrev}
          link="update-password"
          title="Verify OTP"
          subtitle="Since you don't know your current password you need to reset the password.We have sent a 6 digit otp in your email, enter that otp to reset your password"
        />

        <div className="max-w-[18.25rem] w-full flex flex-col gap-1.5">
          <InputOTP
            value={otp}
            onChange={(e: SetStateAction<string>) => setOtp(e)}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            className="text-[#7F7D83] font-inter font-normal text-sm leading-5 tracking-[-0.05px]"
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  className="h-10 w-[2.6rem]"
                  key={index}
                  index={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex gap-0.5 items-center font-roboto font-normal text-[15px] leading-[22px] tracking-[-1%]">
          <p className=" text-[#1B1B1B]">Didn't receive otp? </p>
          <Button
            // onClick={() => handleNext("reset-password-otp")}
            variant="link"
            className="text-[#3333C1] underline p-0"
          >
            resend
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 pl-1">
        <Button
          // disabled={!check || otp.length < 6 ? true : false}
          onClick={() => handleNext("reset-password")}
          className="font-mukta font-medium disabled:text-[#5F5F5F] leading-7 w-fit h-10 rounded-[4px] disabled:bg-[#E0E0E0] disabled:hover:bg-[#E0E0E0] !px-5 !py-3 bg-[#3333C1] text-white"
        >
          Continue
          <DialogSettingsIcons.ChevronRight
            fill="#FFFF"
            // fill={!check || otp.length < 6 ? "#5F5F5F" : "#FFFF"}
          />
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordOtp;
