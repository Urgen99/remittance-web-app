import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import React from "react";
interface TextContainerProps {
  title: string;
  subtitle: string;
  handlePrev: (args: string) => void;
  link: string;
}
const TextContainer: React.FC<TextContainerProps> = ({
  subtitle,
  title,
  handlePrev,
  link,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-transparent size-fit cursor-pointer"
          onClick={() => handlePrev(link)}
        >
          <DialogSettingsIcons.ChevronLeft />
        </Button>
        <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
          {title}
        </h3>
      </div>
      <p className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#696969]">
        {subtitle}
      </p>
    </div>
  );
};

export default TextContainer;
