import useStepper from "@/hooks/stepper";
import InitialSettings from "./InitialSettings";
import UpdateEmail from "./change-email/UpdateEmail";
import ChangePassword from "./change-password/ChangePassword";
import UpdatePin from "./change-pin/UpdatePin";
import CloseAccount from "./close-account/CloseAccount";
import EnterOtp from "./close-account/EnterOtp";
import ConfirmDeletion from "./close-account/ConfirmDeletion";
import CreateNewPassword from "./change-password/CreateNewPassword";
export interface AccountPrivacyProps {
  handleNext: (args: string) => void;
  handlePrev: (args: string) => void;
}
const AccountPrivacy = () => {
  const { activeStep, handlePrev, handleNext } = useStepper("account-privacy");
  return (
    <>
      {activeStep === "account-privacy" && (
        <InitialSettings handleNext={handleNext} />
      )}

      {activeStep === "update-email" && (
        <UpdateEmail handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "update-password" && (
        <ChangePassword handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "create-password" && (
        <CreateNewPassword handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "update-pin" && (
        <UpdatePin handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "close-account" && (
        <CloseAccount handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "enter-otp" && (
        <EnterOtp handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "confirm-deletion" && (
        <ConfirmDeletion handlePrev={handlePrev} />
      )}
    </>
  );
};

export default AccountPrivacy;
