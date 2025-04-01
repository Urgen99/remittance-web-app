import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const UpdateEmail: React.FC<AccountPrivacyProps> = ({
  handleNext,
  handlePrev,
}) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  return (
    <div className="h-full pt-4 pr-7 pb-6 flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <TextContainer
          handlePrev={handlePrev}
          link="account-privacy"
          title="Update email address"
          subtitle="Enter a new email address in the input field below, you need to verify the new email"
        />

        <div className="max-w-[18.25rem] w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
              >
                Enter new email
              </Label>
              <Input
                id="email"
                value={email}
                className="shadow-sm font-inter rounded-[8px] font-normal text-sm leading-5 text-[#7F7D83] tracking-[-0.05px] h-10 pr-2 pl-3"
                placeholder="Enter new email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-[#2D2B32] font-inter font-[475] leading-5 tracking-[-0.05px] text-sm">
                  Verify Otp
                </Label>
                <InputOTP
                  value={otp}
                  onChange={(e: any) => setOtp(e)}
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

              <p className="font-roboto font-normal text-[15px] leading-[22px] tracking-[-1%] text-[#1B1B1B]">
                Didn't get OTP?{" "}
                <span className="text-[#3333C1] underline">resend</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-1">
        <Button
          // onClick={() => handleNext("create-password")}
          className="font-mukta font-medium leading-7 w-fit h-10 rounded-[4px] bg-[#3333c1] hover:bg-[#3333c1] !px-5 !py-3"
        >
          Continue <DialogSettingsIcons.ChevronRight fill="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default UpdateEmail;
