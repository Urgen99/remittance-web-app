import { useEffect, useRef, useState } from "react";

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

export const useSteppers = <T extends string | number>(
  steps: T[],
  initialStep: T
) => {
  const [activeStep, setActiveStep] = useState<T>(initialStep);
  const prevStepRef = useRef<T>(initialStep);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    const prevIndex = steps.indexOf(prevStepRef.current);
    const currentIndex = steps.indexOf(activeStep);
    setDelta(currentIndex - prevIndex);
    prevStepRef.current = activeStep;
  }, [activeStep, steps]);

  const handleNext = () => {
    const index = steps.indexOf(activeStep);
    if (index < steps.length - 1) setActiveStep(steps[index + 1]);
  };

  const handlePrev = () => {
    const index = steps.indexOf(activeStep);
    if (index > 0) setActiveStep(steps[index - 1]);
  };

  const progress = (steps.indexOf(activeStep) / (steps.length - 1)) * 100;
  return { activeStep, setActiveStep, handleNext, handlePrev, delta, progress };
};

export default useStepper;
