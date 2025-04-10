import { SendMoneyStepper } from "@/components/icons/Icons";
import AmountDetails from "@/components/send-money/AmountDetails";
import PaymentInformation from "@/components/send-money/PaymentInformation";
import PaymentTerms from "@/components/send-money/PaymentTerms";
import RecipientDetails from "@/components/send-money/RecipientDetails";
import ReviewPayment from "@/components/send-money/ReviewPayment";
import SendMoneyError from "@/components/send-money/SendMoneyError";
import TransactionStatus from "@/components/send-money/TransactionStatus";
import Steppers from "@/components/ui/stepper/steppers";
import { Steps } from "@/lib/interface";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: 1,
    name: "Enter money",
    Icon: SendMoneyStepper.Dollar,
  },
  {
    step: 2,
    name: "Receiver details",
    Icon: SendMoneyStepper.ArchiveDown,
  },
  {
    step: 3,
    name: "Payment ",
    Icon: SendMoneyStepper.CardSend,
  },
  {
    step: 4,
    name: "Review",
    Icon: SendMoneyStepper.ListCheck,
  },
  {
    step: 5,
    name: "T&C",
    Icon: SendMoneyStepper.Document,
  },
  {
    step: 6,
    name: "Finalize ",
    Icon: SendMoneyStepper.BillCheck,
  },
];

const SendMoney = () => {
  const [activeStep, setActiveStep] = useState(1);
  const progressValue = ((activeStep - 1) / (steps.length - 1)) * 100;
  const prevStepRef = useRef(activeStep);
  const delta = activeStep - prevStepRef.current;

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    prevStepRef.current = activeStep;
  }, [activeStep]);

  const error = false;
  return (
    <section className="flex flex-col justify-between items-center">
      <div className="fixed top-2 z-10 flex flex-col justify-center items-center w-full max-w-4xl ">
        <Steppers
          progressValue={progressValue}
          steps={steps as Steps[]}
          activeStep={activeStep}
        />
      </div>

      <AnimatePresence mode="wait">
        {activeStep && (
          <motion.div
            key={activeStep}
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {error ? (
              <SendMoneyError />
            ) : (
              <>
                {activeStep === 1 && <AmountDetails handleNext={handleNext} />}
                {activeStep === 2 && (
                  <RecipientDetails
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                )}
                {activeStep === 3 && (
                  <PaymentInformation
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                )}
                {activeStep === 4 && (
                  <ReviewPayment
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                )}
                {activeStep === 5 && (
                  <PaymentTerms
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                )}
                {activeStep === 6 && (
                  <TransactionStatus
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SendMoney;
