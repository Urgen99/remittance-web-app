import React from "react";

interface TextContainerProps {
  title: string;
  subtitle?: string;
  Component?: React.ElementType;
}
const TextContainer: React.FC<TextContainerProps> = ({
  title,
  subtitle,
  Component,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h3 className="font-general-sans font-medium text-xl tracking-[-1%] text-[#1b1b1b]">
          {title}
        </h3>
        {subtitle && (
          <p className="font-roboto font-normal text-sm tracking-[-1%] text-[#696969]">
            {subtitle}
          </p>
        )}
      </div>
      <div>{Component && <Component />}</div>
    </div>
  );
};

export default TextContainer;
