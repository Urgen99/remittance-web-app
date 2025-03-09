/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileCompletionProps } from "@/pages/StepperPage";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { Progress } from "../progress";
const Stepper = ({ steps = [] }: { steps: ProfileCompletionProps[] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState(false);
  const [margins, setMargins] = useState({ left: 0, right: 0 });
  const stepRef: any = useRef<Array<HTMLDivElement | null>>([]);
  useEffect(() => {
    if (stepRef.current.length > 0 && stepRef.current[0]) {
      setMargins({
        left: stepRef.current[0]?.offsetWidth / 2,
        right: stepRef.current[steps.length - 1]?.offsetWidth / 2,
      });
    }
  }, [steps.length, stepRef]);

  if (!steps.length) return null;

  const handleNext = () => {
    setCurrentStep((prev: number) => {
      if (prev === steps.length) {
        setIsLastStep(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <div className="w-full fixed top-3 z-10 max-w-xl lg:max-w-5xl flex justify-between items-center gap-5  mb-5">
        {steps.map(({ step, name, Icon }: ProfileCompletionProps) => (
          <div
            key={step}
            className="bg-[#EBEBF9] z-[2] flex flex-col items-center relative px-4"
            ref={(el) => {
              if (el) stepRef.current[step - 1] = el;
            }}
          >
            <div
              className={`flex items-center justify-center mb-[5px] z-[2] text-[12px] lg:text-base `}
            >
              <Icon fill={`${currentStep > step ? "#3333C1" : "#696969"}`} />
            </div>
            <h6
              className={`font-roboto ${
                currentStep > step ? "text-[#3333C1]" : "text-[#696969]"
              }`}
            >
              {name}
            </h6>
          </div>
        ))}

        <Progress
          className="absolute top-[45%] left-0 h-1"
          value={progressValue}
          style={{
            width: `calc(100% - ${margins.left + margins.right}px)`,
            marginLeft: `${margins.left}px`,
            marginRight: `${margins.right}px`,
          }}
        />
      </div>

      <ActiveComponent key={currentStep} steps={steps[currentStep - 1]} />

      {!isLastStep && (
        <Button type="button" onClick={handleNext}>
          {currentStep === steps.length ? "Submit" : "Next"}
        </Button>
      )}
    </>
  );
};

export default Stepper;

const ActiveComponent = ({ steps }: { steps: ProfileCompletionProps }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={steps.step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <steps.Component />
      </motion.div>
    </AnimatePresence>
  );
};
