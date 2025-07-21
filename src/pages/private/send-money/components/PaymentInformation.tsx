import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import EnterPaymentDetails from "./payment-information/EnterPaymentDetails";
import SavedPayments from "./payment-information/SavedPayments";

interface PaymentInformationProps {
  handleNext: () => void;
  handlePrev: () => void;
}
export type Payment = {
  id: string | number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  lastUsed: Date;
};
export type PaymentStep = "saved-payment" | "enter-payment-details";
const initialStep = (paymentMethods: Payment[]) =>
  paymentMethods.length > 0 ? "saved-payment" : "enter-payment-details";

const PaymentInformation = ({
  handleNext,
  handlePrev,
}: PaymentInformationProps) => {
  const paymentMethods = useMemo(
    () => [
      // {
      //   id: "1",
      //   bankName: "Commonwealth Bank of Australia",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-04-09T10:15:00Z"),
      // },
      // {
      //   id: "2",
      //   bankName: "Bank of Queensland",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-03-06 T10:15:00Z"),
      // },
      // {
      //   id: "3",
      //   bankName: "Global IME Bank",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-03-06T10:15:00Z"),
      // },
      // {
      //   id: "4",
      //   bankName: "Global IME Bank",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-03-06T10:15:00Z"),
      // },
      // {
      //   id: "5",
      //   bankName: "Global IME Bank",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-03-06T10:15:00Z"),
      // },
      // {
      //   id: "6",
      //   bankName: "Global IME Bank",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-03-06T10:15:00Z"),
      // },
      // {
      //   id: "7",
      //   bankName: "Global IME Bank",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-03-06T10:15:00Z"),
      // },
      // {
      //   id: "8",
      //   bankName: "Global IME Bank",
      //   accountName: "Ranjit Shrestha",
      //   accountNumber: "123456789xxxxxxxx",
      //   lastUsed: new Date("2025-03-06T10:15:00Z"),
      // },
    ],
    []
  );

  const [activeStep, setActiveStep] = useState<PaymentStep>(
    initialStep(paymentMethods)
  );
  const onStepChange = (step: PaymentStep) => setActiveStep(step);

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
            {activeStep === "enter-payment-details" && (
              <EnterPaymentDetails
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
            {activeStep === "saved-payment" && (
              <SavedPayments
                handleNext={handleNext}
                handlePrev={handlePrev}
                onStepChange={onStepChange}
                paymentMethods={paymentMethods}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PaymentInformation;
