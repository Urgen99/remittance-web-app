import React from "react";
import { DashboardIcons } from "../icons/Icons";

const DataNotFound: React.FC<{ className?: string }> = ({
  className = "min-h-[34.5rem]",
}) => {
  return (
    <div
      className={`border border-[#0000000D] shadow-sm flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col gap-9 items-center">
        <div>
          <DashboardIcons.NoDataFound />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h3 className="font-general-sans font-medium text-xl leading-[120%] tracking-[-2%] text-[#0A090B]">
            There is no data
          </h3>
          <h6 className="font-inter font-normal tracking-[-0.18px] text-[#2D2B32]">
            Looks like there is no data here currently
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DataNotFound;
