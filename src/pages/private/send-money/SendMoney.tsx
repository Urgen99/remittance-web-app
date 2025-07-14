import { SendMoneyStepper } from "@/components/icons/Icons";
import Steppers from "@/components/ui/stepper/steppers";
import { Steps } from "@/lib/interface";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, useEffect, useRef, useState } from "react";

const AmountDetails = lazy(() => import("./components/AmountDetails"));
const PaymentInformation = lazy(
  () => import("./components/PaymentInformation")
);
const PaymentTerms = lazy(() => import("./components/PaymentTerms"));
const RecipientDetails = lazy(() => import("./components/RecipientDetails"));
const ReviewPayment = lazy(() => import("./components/ReviewPayment"));
const SendMoneyError = lazy(() => import("./components/SendMoneyError"));
const TransactionStatus = lazy(() => import("./components/TransactionStatus"));

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
    <section className="flex flex-col justify-between items-center w-full">
      <div className="lg:fixed top-3.5 lg:z-10 hidden lg:flex flex-col justify-center items-center w-full lg:max-w-xl xl:max-w-3xl ">
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
            className="w-full"
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
