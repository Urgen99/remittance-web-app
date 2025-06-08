/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import React, { useState } from "react";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";

const EnterOtp: React.FC<AccountPrivacyProps> = ({
  handleNext,
  handlePrev,
}) => {
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(false);

  return (
    <div className="h-full pb-6 pt-4 pr-7 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <TextContainer
          handlePrev={() => handlePrev("close-account")}
          link="close-account"
          title="Enter otp before deletion"
          subtitle="We have sent a 6 digit otp in your email , enter that otp before account deletion"
        />

        <div className="max-w-[18.25rem] w-full flex flex-col gap-1.5">
          <h6 className="text-[#2D2B32] font-inter font-[475] leading-5 tracking-[-0.05px] text-sm">
            Verify Otp
          </h6>
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
      </div>

      <div className="flex flex-col gap-5 pl-1">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms1"
            onCheckedChange={(e: any) => setCheck(e)}
            value={check.toString()}
            className="size-[22px] mt-1.5 border border-black  data-[state=checked]:bg-[#3333c1]"
          />
          <div className="max-w-[28.25rem] w-full">
            <label
              htmlFor="terms1"
              className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#696969]"
            >
              I acknowledge that I am voluntarily closing my account, fully
              understanding the consequences, and take responsibility for any
              outcomes that may result
            </label>
          </div>
        </div>

        <Button
          // disabled={!check || otp.length < 6 ? true : false}
          onClick={() => handleNext("confirm-deletion")}
          className="font-mukta font-medium disabled:text-[#5F5F5F] leading-7 w-fit h-10 rounded-[4px] disabled:bg-[#E0E0E0] disabled:hover:bg-[#E0E0E0] !px-5 !py-3 bg-[#3333C1] text-white"
        >
          Continue
          <DialogSettingsIcons.Delete
          // fill={!check || otp.length < 6 ? "#5F5F5F" : "#FFFF"}
          />
        </Button>
      </div>
    </div>
  );
};

export default EnterOtp;
