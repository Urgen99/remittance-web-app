import { useState } from "react";

const useStepper = (page: string) => {
  const [activeStep, setActiveStep] = useState(page || "user-details");

  const handleNext = (page: string) => setActiveStep(page);
  const handlePrev = (page: string) => setActiveStep(page);

  return {
    activeStep,
    handleNext,
    handlePrev,
  };
};

export default useStepper;
