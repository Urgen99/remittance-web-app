import React from "react";
import { AccountPrivacyProps } from "../AccountPrivacy";
import TextContainer from "../TextContainer";

const UpdateEmail: React.FC<AccountPrivacyProps> = ({
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-3">
        <TextContainer
          handlePrev={handlePrev}
          link="account-privacy"
          title="Update email address"
          subtitle="Enter a new email address in the input field below, you need to verify the new email"
        />
      </div>
    </div>
  );
};

export default UpdateEmail;
