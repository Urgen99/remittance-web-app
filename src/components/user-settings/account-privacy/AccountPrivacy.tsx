import useStepper from "@/hooks/stepper";
import InitialSettings from "./InitialSettings";
import UpdateEmail from "./change-email/UpdateEmail";
import ChangePassword from "./change-password/ChangePassword";
import CreateNewPassword from "./change-password/CreateNewPassword";
import UpdatePin from "./change-pin/UpdatePin";
import CloseAccount from "./close-account/CloseAccount";
import ConfirmDeletion from "./close-account/ConfirmDeletion";
import EnterOtp from "./close-account/EnterOtp";
import ResetPassword from "./reset-password/ResetPassword";
import ResetPasswordOtp from "./reset-password/ResetPasswordOtp";
export interface AccountPrivacyProps {
  handleNext: (args: string) => void;
  handlePrev: (args: string) => void;
}
const AccountPrivacy = () => {
  const { activeStep, handlePrev, handleNext } = useStepper("account-privacy");
  return (
    <>
      {/* ---------- INITIAL SETTINGS ---------- */}

      {activeStep === "account-privacy" && (
        <InitialSettings handleNext={handleNext} />
      )}

      {/* ---------- UPDATE EMAIL SETTINGS ---------- */}

      {activeStep === "update-email" && (
        <UpdateEmail handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {/* ---------- UPDATE PASSWORD SETTINGS ---------- */}

      {activeStep === "update-password" && (
        <ChangePassword handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "create-password" && (
        <CreateNewPassword handlePrev={handlePrev} />
      )}

      {/* ---------- RESET PASSWORD SETTINGS ---------- */}
      {activeStep === "reset-password-otp" && (
        <ResetPasswordOtp handleNext={handleNext} handlePrev={handlePrev} />
      )}

      {activeStep === "reset-password" && (
        <ResetPassword handlePrev={handlePrev} />
      )}

      {/* ---------- UPDATE PIN SETTINGS ---------- */}

      {activeStep === "update-pin" && <UpdatePin handlePrev={handlePrev} />}

      {/* ---------- CLOSE ACCOUNT SETTINGS ---------- */}

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
