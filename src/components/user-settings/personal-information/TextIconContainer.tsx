import React from "react";

type TextIconContainerProps = {
  Icon: React.FC;
  text: string;
};
const TextIconContainer: React.FC<TextIconContainerProps> = ({
  Icon,
  text,
}) => {
  return (
    <div className="flex gap-2 items-center border-l-2 border-[#3333C1] pl-3 max-h-5">
      <Icon />

      <h5 className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#1b1b1b]">
        {text}
      </h5>
    </div>
  );
};

export default TextIconContainer;
