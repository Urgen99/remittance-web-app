import React from "react";
type DetailsTableProps<T extends Rows> = {
  rows: T[];
};

type Rows = {
  label: string;
  value: React.ReactNode;
};
const PaymentDetailTable = <T extends Rows>({ rows }: DetailsTableProps<T>) => {
  return (
    <div>
      {rows &&
        rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center h-10 border-b border-[#F1F1F1]"
          >
            <div className="flex-1 flex items-center justify-between">
              <div className="font-roboto font-normal text-[#696969] tracking-[-1%] text-base leading-6">
                {label}
              </div>
              <div className="text-[#1b1b1b] capitalize">{value}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PaymentDetailTable;
