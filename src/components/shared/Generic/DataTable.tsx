import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  type ColumnDef,
  type Table as TableType,
} from "@tanstack/react-table";
type TableProps<T> = {
  table: TableType<T>;
  columns: ColumnDef<T>[];
};

const DataTable = <T,>({ table, columns }: TableProps<T>) => {
  return (
    <div className="flex flex-col gap-3">
      <Table className="!bg-white border border-[#CFCFCF]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-[#F3F3F3] h-12">
              {headerGroup.headers.map((header) => (
                <TableHead
                  className={`border border-[#CFCFCF] font-inter font-semibold text-[#696969] text-sm leading-4`}
                  style={{
                    width: header.getSize(),
                    // maxWidth: header.column.getSize(),
                  }}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="border border-[#F1F1F1] font-roboto capitalize font-normal text-sm leading-4 tracking-[-1%] text-[#1B1B1B]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No Results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
