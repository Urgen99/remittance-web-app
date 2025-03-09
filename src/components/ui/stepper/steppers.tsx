import React, { useEffect, useRef, useState } from "react";
import { Progress } from "../progress";

interface SteppersProps {
  children: (
    stepRef: React.MutableRefObject<Array<HTMLDivElement | null>>
  ) => React.ReactNode;
  progressValue: number;
  steps: any[];
}

const Steppers = ({ children, progressValue, steps }: SteppersProps) => {
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
    <div className="max-w-xl w-full flex justify-center border-red-500 border-2 relative">
      <div className="w-full flex justify-between items-center mb-5 relative">
        {children(stepRef)}

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
    </div>
  );
};

export default Steppers;

export const Step = ({
  children,
  step,
  stepRef,
}: {
  step: number;
  children: React.ReactNode;
  stepRef: React.MutableRefObject<Array<HTMLDivElement | null>>;
}) => {
  return (
    <div
      ref={(el) => {
        if (el) stepRef.current[step - 1] = el;
      }}
      className="bg-[#ebebf9] flex flex-col items-center text-center space-y-2 border-red-500 border-2"
    >
      {children}
    </div>
  );
};
