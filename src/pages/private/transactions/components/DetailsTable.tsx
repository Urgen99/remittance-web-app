import React from "react";

type DetailsTableProps<T extends Rows> = {
  tableLabel: string;
  rows: T[];
};

type Rows = {
  label: string;
  value: React.ReactNode;
};

const DetailsTable = <T extends Rows>({
  tableLabel,
  rows,
}: DetailsTableProps<T>) => {
  return (
    <div className="w-full p-1 rounded-[12px] border border-[#0000001A]">
      <div className="bg-[#EBEBF9] rounded-t-[8px] p-3">
        <h6 className="text-left font-roboto font-normal text-[#1b1b1b] text-base leading-6">
          {tableLabel}
        </h6>
      </div>

      <div>
        {rows &&
          rows.map(({ label, value }, index) => (
            <div
              key={label}
              className={`p-3 border-b border-[#F1F1F1] ${
                index === rows.length - 1 && "border-none"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-roboto font-normal text-[#696969] tracking-[-1%] text-base leading-6">
                  {label}
                </div>
                <div className="text-[#1b1b1b] capitalize">{value}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailsTable;
