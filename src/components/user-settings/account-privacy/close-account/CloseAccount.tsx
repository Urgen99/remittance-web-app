import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";
import { Button } from "@/components/ui/button";
const warnings = [
  "No access to your account",
  "You can't send money",
  "All your personal info will be removed",
  "You will have to verify KYC again",
];
const CloseAccount: React.FC<AccountPrivacyProps> = ({
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="h-full pb-6 pt-4 pr-7 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <TextContainer
          handlePrev={handlePrev}
          link="account-privacy"
          title="Important warning message"
          subtitle="Closing your account will remove your user ID, password, and access to financial services, including sending and receiving money"
        />

        <div className="max-w-[34.25rem] w-full flex flex-col gap-2">
          {warnings.map((texts) => (
            <div
              key={Math.random()}
              className="gap-5 flex items-center rounded-[4px] border border-[#E0E0E0] p-3"
            >
              <div className="flex items-center justify-center size-[22px] bg-[#FFCDD2] rounded-full p-0.5">
                <DialogSettingsIcons.Block />
              </div>

              <h4 className="font-general-sans font-medium text-[#1b1b1b] leading-5 text-base">
                {texts}
              </h4>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms1"
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
          onClick={() => handleNext("enter-otp")}
          className="font-mukta font-medium leading-7 w-fit h-10 rounded-[4px] bg-[#3333c1] hover:bg-[#3333c1] !px-5 !py-3"
        >
          Continue <DialogSettingsIcons.ChevronRight fill="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default CloseAccount;
