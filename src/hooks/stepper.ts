import { useState } from "react";

/**
 * Hook to manage the stepper for user settings dialog component
 * @example
 *  const { activeStep, handleNext, handlePrev } = useStepper("user-details");
 */

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
