import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import React, { useState } from "react";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";

const CreateNewPassword: React.FC<AccountPrivacyProps> = ({
  handleNext,
  handlePrev,
}) => {
  const [password, setPassword] = useState("");
  return (
    <div className="h-full pt-4 pr-7 pb-6 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <TextContainer
          handlePrev={handlePrev}
          link="account-privacy"
          title="Create new password"
          subtitle="To change your password, first you need to provide your old password and then only you can create new one"
        />

        <div className="max-w-[31.25rem] w-full">
          <div className="flex flex-col gap-3">
            <div className="max-w-[18.25rem] w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="password"
                  className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                >
                  Password
                </Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="password"
                  className="font-inter font-[475] text-sm leading-5 text-[#2D2B32] tracking-[-0.05px]"
                >
                  Confirm new password
                </Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <p className="font-roboto font-normal text-[15px] leading-[22px] tracking-[-1%] text-[#1B1B1B]">
              Password must be at least <u>8 word length</u> and must contain a{" "}
              <u>special character #,$,@</u>
            </p>
          </div>
        </div>
      </div>

      <div className="pl-1">
        <Button
          onClick={() => handleNext("create-password")}
          className="font-mukta font-medium leading-7 w-fit h-10 rounded-[4px] bg-[#3333c1] hover:bg-[#3333c1] !px-5 !py-3"
        >
          Continue <DialogSettingsIcons.ChevronRight fill="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default CreateNewPassword;
