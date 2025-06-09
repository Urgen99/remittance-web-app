import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { SetStateAction, useState } from "react";
import TextContainer from "../TextContainer";

const UpdatePin = ({ handlePrev }: { handlePrev: (args: string) => void }) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-3">
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
                <Label
                  htmlFor="password"
                  className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                >
                  Enter current PIN
                </Label>
                <InputOTP
                  value={otp}
                  onChange={(e: SetStateAction<string>) => setOtp(e)}
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  className="text-[#7F7D83] font-inter font-normal text-sm leading-5 tracking-[-0.05px]"
                >
                  <InputOTPGroup className="gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <InputOTPSlot
                        className="h-10 w-[2.6rem] bg-[#F7F7F7] shadow-xs border border-[#E0E0E0]"
                        key={index}
                        index={index}
                        aria-placeholder="-"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="password"
                  className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                >
                  Enter new PIN
                </Label>
                <InputOTP
                  value={otp}
                  onChange={(e: SetStateAction<string>) => setOtp(e)}
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  className="text-[#7F7D83] font-inter font-normal text-sm leading-5 tracking-[-0.05px]"
                >
                  <InputOTPGroup className="gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <InputOTPSlot
                        className="h-10 w-[2.6rem] bg-[#F7F7F7] shadow-xs border border-[#E0E0E0]"
                        key={index}
                        index={index}
                        aria-placeholder="-"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="password"
                  className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                >
                  Confirm new PIN
                </Label>
                <InputOTP
                  value={otp}
                  onChange={(e: SetStateAction<string>) => setOtp(e)}
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  className="text-[#7F7D83] font-inter font-normal text-sm leading-5 tracking-[-0.05px]"
                >
                  <InputOTPGroup className="gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <InputOTPSlot
                        className="h-10 w-[2.6rem] bg-[#F7F7F7] shadow-xs border border-[#E0E0E0]"
                        key={index}
                        aria-placeholder="-"
                        index={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <p className="font-roboto font-normal text-[15px] leading-[22px] tracking-[-1%] text-[#1B1B1B]">
              Make sure you don't use concurrent numbers such as 1234 or similar
              number 1122 or 2244
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePin;
