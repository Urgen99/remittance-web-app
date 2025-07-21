import { MoveLeft } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

interface NavigationButtonsProps {
  onBackClick?: () => void;
  onContinueClick?: (e?: any) => void;
  disabled?: boolean;
  type?: "submit" | "button";
  showBackButton?: boolean;
}

const classNames =
  "flex items-center justify-center gap-2 font-inter font-[475] tracking-[-0.18px] cursor-pointer px-4 h-11 rounded-[6px] transition-all ease-in-out duration-300";

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBackClick,
  onContinueClick,
  disabled = false,
  type = "button",
  showBackButton = true,
}) => {
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-4 transition-all ease-in-out duration-300">
      {showBackButton && (
        <Button
          type="button"
          onClick={onBackClick}
          variant="outline"
          className={`${classNames} border-[#5F5F5F] text-[#5F5F5F] w-full md:w-auto`}
        >
          <MoveLeft className="text-[#5F5F5F]" />
          Go Back
        </Button>
      )}
      <Button
        type={type}
        disabled={disabled}
        onClick={onContinueClick}
        className={`${classNames} w-full ${
          showBackButton ? "md:max-w-[15.5rem]" : ""
        } hover:bg-[#3333c1e0] bg-[#3333C1] disabled:bg-[#696969] text-white`}
      >
        Continue
      </Button>
    </section>
  );
};

export default NavigationButtons;
