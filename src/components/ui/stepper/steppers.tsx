import { Steps } from "@/lib/interface";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "../progress";

interface SteppersProps {
  progressValue: number;
  steps: Steps[];
  activeStep: number;
}

const Steppers: React.FC<SteppersProps> = ({
  progressValue,
  steps,
  activeStep,
}) => {
  const stepRef: any = useRef<Array<HTMLDivElement | null>>([]);

  const [margins, setMargins] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (stepRef.current.length > 0 && stepRef.current[0]) {
      setMargins({
        left: stepRef.current[0]?.offsetWidth / 2,
        right: stepRef.current[steps.length - 1]?.offsetWidth / 2,
      });
    }
  }, [steps.length, stepRef]);

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
              className={`font-roboto ${
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
