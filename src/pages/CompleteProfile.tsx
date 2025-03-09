import { StepperIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import Steppers, { Step } from "@/components/ui/stepper/steppers";
import { motion } from "framer-motion";
import { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import SelectDocument from "./SelectDocument";
import UploadDocument from "./UploadDocument";

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
    <div className="flex flex-col justify-between">
      {/* <div className="border-red-500 border-2 p-4 flex items-center justify-center"> */}
      {/* <Steppers margins={margins} progressValue={progressValue}>
          {steps.map(({ step, name, Icon }) => (
            <Step key={step} steps={steps} setMargins={setMargins} step={step}>
              <div
                className={`flex items-center justify-center mb-[5px] z-[2] text-[12px] lg:text-base `}
              >
                <Icon fill={`${activeStep > step ? "#3333C1" : "#696969"}`} />
              </div>
              <h6
                className={`font-roboto ${
                  activeStep > step ? "text-[#3333C1]" : "text-[#696969]"
                }`}
              >
                {name}
              </h6>
            </Step>
          ))}
        </Steppers> */}

      <div className="flex flex-col justify-between items-center w-full max-w-xl mx-auto space-y-6">
        <Steppers progressValue={progressValue} steps={steps}>
          {(stepRef) =>
            steps.map(({ step, name, Icon }) => (
              <Step key={step} step={step} stepRef={stepRef}>
                <div className="flex items-center justify-center mb-[5px] z-[2] text-[12px] lg:text-base">
                  <Icon fill={activeStep >= step ? "#3333C1" : "#696969"} />
                </div>
                <h6
                  className={`font-roboto ${
                    activeStep >= step ? "text-[#3333C1]" : "text-[#696969]"
                  }`}
                >
                  {name}
                </h6>
              </Step>
            ))
          }
        </Steppers>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {activeStep === 1 && <UploadDocument />}
        {activeStep === 2 && <SelectDocument />}
        {activeStep === 3 && <SelectDocument />}
        {activeStep === 4 && <PersonalDetails />}
      </motion.div>

      <div className="flex justify-between w-full items-center">
        <Button onClick={handlePrev} disabled={activeStep === 1}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={activeStep === steps.length}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CompleteProfile;
