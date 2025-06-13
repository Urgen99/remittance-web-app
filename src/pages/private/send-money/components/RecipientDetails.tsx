import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import EnterRecipientDetails from "./recipient-details/EnterRecipientDetails";
import SavedRecipients from "./recipient-details/SavedRecipients";
export type Recipient = {
  name: string;
  bankName: string;
  accountNumber: string;
};
interface RecipientDetailsProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export type RecipientStep = "saved-recipients" | "enter-recipient-details";
const initialStep = (recipients: Recipient[]) =>
  recipients.length > 0 ? "saved-recipients" : "enter-recipient-details";
const RecipientDetails = ({
  handleNext,
  handlePrev,
}: RecipientDetailsProps) => {
  const recipients = useMemo(
    () => [
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
      {
        name: "Ranjit Kumar Shrestha",
        bankName: "Nepal Bank Limited",
        accountNumber: "123456789XXXXXXX",
      },
    ],
    []
  );
  const [activeStep, setActiveStep] = useState<RecipientStep>(
    initialStep(recipients)
  );
  const onStepChange = (step: RecipientStep) => setActiveStep(step);

  return (
    <section className="mt-7 ">
      <AnimatePresence mode="wait">
        {activeStep && (
          <motion.div
            key={activeStep}
            initial={{ x: "50%", opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {activeStep === "enter-recipient-details" && (
              <EnterRecipientDetails
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
            {activeStep === "saved-recipients" && (
              <SavedRecipients
                handleNext={handleNext}
                handlePrev={handlePrev}
                recipients={recipients}
                onStepChange={onStepChange}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RecipientDetails;
