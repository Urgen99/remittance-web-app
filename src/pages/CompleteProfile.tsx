import PersonalDetails from "@/components/complete-profile/PersonalDetails";
import SelectDocument from "@/components/complete-profile/SelectDocument";
import UploadDocumentBack from "@/components/complete-profile/UploadDocumentBack";
import UploadDocumentFront from "@/components/complete-profile/UploadDocumentFront";
import { StepperIcons } from "@/components/icons/Icons";
import Steppers from "@/components/ui/stepper/steppers";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
export interface Steps {
  step: number;
  name: string;
  Icon: React.FC<{ fill?: string }>;
}
const steps = [
  {
    step: 1,
    name: "Select Document",
    Icon: StepperIcons.SelectDocument,
  },
  {
    step: 2,
    name: "Document Front",
    Icon: StepperIcons.DocumentFront,
  },
  {
    step: 3,
    name: "Document Back",
    Icon: StepperIcons.DocumentBack,
  },
  {
    step: 4,
    name: "Personal Details",
    Icon: StepperIcons.PersonalDetails,
  },
];
const CompleteProfile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const progressValue = ((activeStep - 1) / (steps.length - 1)) * 100;

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

  return (
    <div className="flex flex-col justify-between items-center ">
      <div className="fixed top-2 z-10 flex flex-col justify-center items-center w-full max-w-xl">
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
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
    </div>
  );
};

export default CompleteProfile;
