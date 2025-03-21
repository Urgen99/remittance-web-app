import React from "react";

type DataTableProps<T> = {
  rows: T[];
  columns: Columns<T>[];
};

type Columns<T> = {
  key: keyof T;
  header: string;
  iconLeft?: React.ReactNode;
  iconRight?: {
    icon: React.ReactNode;
    onClick: () => void;
  };
  render?: (data: T[keyof T]) => React.ReactNode;
};

const DataTable = <T extends { id: number | string }>({
  rows,
  columns,
}: DataTableProps<T>) => {
  return (
    <table className="w-full border border-[#CFCFCF]">
      <TableHeader columns={columns} />

      <tbody>
        {rows.map((item) => (
          <TableRow key={item.id} row={item} columns={columns} />
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

type TableHeaderProps<T> = {
  columns: Columns<T>[];
};

function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className="bg-[#F3F3F3] h-12">
        {columns.map((column) => (
          <th key={String(column.key)} className="border px-4 border-[#CFCFCF]">
            <div
              className={`capitalize flex items-center gap-2 ${
                column.header === "actions" && "justify-center"
              }`}
            >
              {column.iconLeft && <span>{column.iconLeft}</span>}
              <p className="font-inter text-[#696969] font-medium text-sm tracking-[-0.02px]">
                {column.header}
              </p>
              {column.iconRight && (
                <span
                  aria-label="Sort"
                  onClick={column.iconRight.onClick}
                  className={`cursor-pointer ${
                    column.iconRight ? "hover:opacity-75" : ""
                  }`}
                >
                  {column.iconRight.icon}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

type TableRowProps<T> = {
  row: T;
  columns: Columns<T>[];
};

function TableRow<T extends { id: number | string }>({
  row,
  columns,
}: TableRowProps<T>) {
  return (
    <tr key={row.id} className="h-14">
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          data={row[column.key]}
          render={column.render}
        />
      ))}
    </tr>
  );
}

type TableCellProps<T> = {
  data: T;
  render?: (data: T) => React.ReactNode;
};

function TableCell<T>({ data, render }: TableCellProps<T>) {
  return (
    <td className="font-roboto font-normal text-sm tracking-[-1%] leading-[18px] text-[#1b1b1b] px-3 border border-[#F1F1F1] capitalize">
      {render ? render(data) : String(data)}
    </td>
  );
}
