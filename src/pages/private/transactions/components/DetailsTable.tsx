import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

type DetailsTableProps<T extends Rows> = {
  tableLabel: string;
  rows: T[];
};

type Rows = {
  label: string;
  value: ReactNode;
};

const DetailsTable = <T extends Rows>({
  tableLabel,
  rows,
}: DetailsTableProps<T>) => {
  return (
    <div className="w-full border border-[#0000001A] !p-1 rounded-[12px]">
      <Table className="">
        <TableHeader>
          <div className="bg-[#EBEBF9] rounded-t-[8px]">
            <TableRow>
              <TableHead className="text-left font-roboto font-normal text-[#1b1b1b] text-base leading-6">
                {tableLabel}
              </TableHead>
            </TableRow>
          </div>
        </TableHeader>

        <TableBody>
          {rows &&
            rows.map(({ label, value }, index) => (
              <TableRow
                key={label}
                className={`p-3 border-b border-[#F1F1F1] hover:bg-transparent ${
                  index === rows.length - 1 && "border-none"
                }`}
              >
                <TableCell className="flex items-center justify-between">
                  <div className="font-roboto font-normal text-[#696969] tracking-[-1%] text-base leading-6">
                    {label}
                  </div>
                  <div className="text-[#1b1b1b] capitalize">{value}</div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailsTable;
