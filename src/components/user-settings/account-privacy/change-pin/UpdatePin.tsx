import React from "react";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";

const UpdatePin: React.FC<AccountPrivacyProps> = ({
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-3">
        <TextContainer
          handlePrev={handlePrev}
          link="account-privacy"
          title="Change pin"
          subtitle="To change your pin, first you need to provide your old pin and then only you can create new one"
        />
      </div>
    </div>
  );
};

export default UpdatePin;
