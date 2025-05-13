import PersonalDetails from "@/components/complete-profile/PersonalDetails";
import SelectDocument from "@/components/complete-profile/SelectDocument";
import UploadDocumentBack from "@/components/complete-profile/UploadDocumentBack";
import UploadDocumentFront from "@/components/complete-profile/UploadDocumentFront";
import { CompleteProfileStepper } from "@/components/icons/Icons";
import Steppers from "@/components/ui/stepper/steppers";
import { Steps } from "@/lib/interface";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: 1,
    name: "Select Document",
    Icon: CompleteProfileStepper.SelectDocument,
  },
  {
    step: 2,
    name: "Document Front",
    Icon: CompleteProfileStepper.DocumentFront,
  },
  {
    step: 3,
    name: "Document Back",
    Icon: CompleteProfileStepper.DocumentBack,
  },
  {
    step: 4,
    name: "Personal Details",
    Icon: CompleteProfileStepper.PersonalDetails,
  },
];
const CompleteProfile = () => {
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

  return (
    <section className="flex flex-col justify-between items-center ">
      <div className="md:fixed top-3.5 md:z-10 hidden md:flex flex-col justify-center items-center w-full max-w-md lg:max-w-xl">
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
            {activeStep === 1 && <SelectDocument handleNext={handleNext} />}

            {activeStep === 2 && (
              <UploadDocumentFront
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
            {activeStep === 3 && (
              <UploadDocumentBack
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}

            {activeStep === 4 && <PersonalDetails handlePrev={handlePrev} />}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CompleteProfile;
