import { MoveLeft } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface NavigationButtonsProps {
  onBackClick: () => void;
  onContinueClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button";
}

const classNames =
  "flex items-center justify-center gap-2 font-inter font-[475] tracking-[-0.18px] cursor-pointer px-4 h-11 rounded-[6px]";

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBackClick,
  onContinueClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Button
        onClick={onBackClick}
        variant="outline"
        className={`${classNames} border-[#5F5F5F] text-[#5F5F5F]`}
      >
        <MoveLeft className="text-[#5F5F5F]" />
        Go Back
      </Button>

      <Button
        type={type}
        disabled={disabled}
        onClick={onContinueClick}
        className={`${classNames} w-full max-w-[15.5rem] hover:bg-[#3333c1e0] bg-[#3333C1] disabled:bg-[#696969] text-white`}
      >
        Continue
      </Button>
    </div>
  );
};

export default NavigationButtons;
