import { Steps } from "@/lib/interface";
import { useEffect, useRef, useState } from "react";
import { Progress } from "../progress";

interface SteppersProps {
  progressValue: number;
  steps: Steps[];
  activeStep: number;
}

const Steppers = ({ progressValue, steps, activeStep }: SteppersProps) => {
  const stepRef = useRef<Array<HTMLDivElement | null>>([]);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [margins, setMargins] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateMargins = () => {
      const firstStep = stepRef.current[0];
      const lastStep = stepRef.current[steps.length - 1];

      if (firstStep && lastStep) {
        const leftMargin = firstStep.offsetWidth / 2;
        const rightMargin = lastStep.offsetWidth / 2;

        setMargins({ left: leftMargin, right: rightMargin });
      }
    };

    //  Initialize ResizeObserver
    observerRef.current = new ResizeObserver(updateMargins);

    // observe each step element
    stepRef.current.forEach((stepEl) => {
      if (stepEl) observerRef.current?.observe(stepEl);
    });

    // Initial margin calculation
    updateMargins();

    // cleanup
    return () => {
      if (observerRef.current) {
        stepRef.current.forEach((stepEl) => {
          if (stepEl) observerRef.current?.unobserve(stepEl);
        });

        observerRef.current.disconnect();
      }
    };
  }, [steps.length]);
  return (
    <div className="w-full flex justify-between items-center relative">
      <div className="flex justify-between w-full relative">
        {steps.map(({ step, name, Icon }) => (
          <div
            key={step}
            ref={(el) => {
              if (el) stepRef.current[step - 1] = el;
            }}
            className="flex flex-col items-center text-center z-[2]"
          >
            <div className="bg-[#EBEBF9] w-12 flex items-center justify-center">
              <Icon fill={activeStep >= step ? "#3333C1" : "#696969"} />
            </div>
            <h6
              className={`text-sm lg:text-base font-roboto ${
                activeStep >= step ? "text-[#3333C1]" : "text-[#696969]"
              }`}
            >
              {name}
            </h6>
          </div>
        ))}
      </div>

      <Progress
        className="absolute top-[20%] left-0 h-1"
        value={progressValue}
        style={{
          width: `calc(100% - ${margins.left + margins.right}px)`,
          marginLeft: `${margins.left}px`,
          marginRight: `${margins.right}px`,
        }}
      />
    </div>
  );
};

export default Steppers;
