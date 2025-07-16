import { TransactionIcons } from "@/components/icons/Icons";
import DataNotFound from "@/components/shared/DataNotFound";
import DataTable from "@/components/shared/Generic/DataTable";
import TextContainer from "@/components/shared/TextContainer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CircleChevronLeft, CircleChevronRight, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusColors: Record<string, string> = {
  initiated: "bg-[#EBEBF9] text-[#1E2CA8]",
  progress: "bg-[#FAEEE1] text-[#664301]",
  verifying: "bg-[#E5CCE8] text-[#7B008B]",
  completed: "bg-[#E1FAEA] text-[#016626]",
  delivered: "bg-[#E1FAEA] text-[#016626]",
};
const getStatusColor = (status: string) => statusColors[status];

export type TransactionsTableType = {
  id: string | number;
  recipientName: string;
  status: string;
  amount: string | number;
  method: string;
  date: string;
};

export type ExportColumnDef<T> = ColumnDef<T> & {
  meta?: ExportMeta<T>;
  accessorKey?: string | number;
};

interface ExportMeta<T> {
  exportHeader: string;
  exportValue?: (row: T) => string | number;
}

const data: TransactionsTableType[] = [
  {
    id: 1,
    recipientName: "Ranjit Kumar",
    status: "initiated",
    amount: 120,
    method: "Bank Transfer",
    date: "2025-04-27T10:15:00Z",
  },
  {
    id: 2,
    recipientName: "Ranjit Kumar",
    status: "progress",
    amount: 120,
    method: "Bank Transfer",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 3,
    recipientName: "Ranjit Kumar",
    status: "verifying",
    amount: 120,
    method: "Bank Transfer",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 4,
    recipientName: "Ranjit Kumar",
    status: "completed",
    amount: 120,
    method: "Bank Transfer",
    date: "2025-06-06T10:15:00Z",
  },
  {
    id: 5,
    recipientName: "Ranjit Kumar",
    status: "completed",
    amount: 120,
    method: "Bank Transfer",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 6,
    recipientName: "Bessie Cooper",
    status: "initiated",
    amount: 351.02,
    method: "visa",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 7,
    recipientName: "Jane Cooper",
    status: "progress",
    amount: 275.43,
    method: "promissory",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 8,
    recipientName: "Theresa Webb",
    status: "delivered",
    amount: 782.01,
    method: "apple pay",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 9,
    recipientName: "Darlene Robertson",
    status: "delivered",
    amount: 169.43,
    method: "american express",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 10,
    recipientName: "Devon Lane",
    status: "delivered",
    amount: 475.22,
    method: "payMee",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 11,
    recipientName: "Marvin Mckinney",
    status: "delivered",
    amount: 767.51,
    method: "aura",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 12,
    recipientName: "Kristin Watson",
    status: "delivered",
    amount: 943.65,
    method: "pix",
    date: "2025-03-06T10:15:00Z",
  },
  {
    id: 13,
    recipientName: "Eleanor Pena",
    status: "delivered",
    amount: 473.85,
    method: "visa electron",
    date: "2025-03-06T10:15:00Z",
  },
];

const TransactionHistory = () => {
  const navigate = useNavigate();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<TransactionsTableType>[] = [
    {
      accessorKey: "recipientName",
      size: 283,
      header: ({ column }) => (
        <div className="flex items-center gap-1">
          <TransactionIcons.Person />
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="!p-0 hover:bg-transparent group "
          >
            Receiver name
            <TransactionIcons.ArrowDown
              className={`${
                column.getIsSorted() === "asc" ? "rotate-180" : ""
              } transition-all duration-200 ease-in-out`}
            />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarFallback className="font-inter font-medium text-sm leading-[120%] tracking-[-0.5px] text-[#1751D0]">
              {String(row.getValue("recipientName")).charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h6 className="font-inter font-[550] text-sm leading-5 tracking-[-0.02px] text-[#0A090B]">
            {row.getValue("recipientName")}
          </h6>
        </div>
      ),
    },

    {
      accessorKey: "amount",
      size: 165,
      header: () => (
        <div className="flex items-center gap-1">
          <TransactionIcons.Dollar />
          Amount
        </div>
      ),
      cell: ({ row }) => `$${row.getValue("amount")}`,
    },

    {
      accessorKey: "method",
      size: 289,
      header: () => (
        <div className="flex items-center gap-2">
          <TransactionIcons.Method />
          Method
        </div>
      ),
      cell: ({ row }) => row.getValue("method"),
    },

    {
      accessorKey: "date",
      size: 161,
      header: () => (
        <div className="flex items-center gap-1">
          <TransactionIcons.Calendar />
          Sent On
        </div>
      ),

      cell: ({ row }) => (
        <p>{format(new Date(row.getValue("date")), "dd/MM/yyyy")}</p>
      ),
    },

    {
      accessorKey: "status",
      size: 147,
      header: () => (
        <div className="flex items-center gap-1">
          <TransactionIcons.Golf />
          Status
        </div>
      ),

      cell: ({ row }) => (
        <div
          className={`flex items-center justify-center rounded-[5px] h-6 px-[5px] py-[3px] font-inter font-[475] capitalize w-fit ${getStatusColor(
            row.getValue("status")
          )} ${getStatusColor(row.getValue("status"))}`}
        >
          <p>{row.getValue("status")}</p>
        </div>
      ),
    },

    {
      id: "actions",
      size: 135,
      header: () => (
        <div className="flex items-center justify-center">Actions</div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Button
            className="border border-[#E6E6E6] shadow-[0_1.5px_4px_-1px_rgba(10,9,11,0.07)] bg-white hover:bg-[#3333C1] transition-colors duration-200 ease-in-out text-[#1B1B1B] hover:text-white w-16 h-8"
            onClick={() => navigate(`/transactions/${row.original.id}`)}
          >
            <EyeIcon size={20} />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  return (
    <div className="flex flex-col gap-6">
      <div>
        <TextContainer title="Transaction History" Component={TempFilter} />
      </div>

      {data.length ? (
        <DataTable table={table} columns={columns} />
      ) : (
        <DataNotFound />
      )}
    </div>
  );
};

export default TransactionHistory;

// Remove later
const TempFilter = () => {
  return (
    <div className="border border-[#e6e6e6] rounded-[6px] px-2.5 h-8 flex items-center gap-2">
      <div>
        <CircleChevronLeft className="size-5 text-[#4F4D55]" />
      </div>
      <div>
        <h6 className="text-[#4F4D55] font-roboto font-normal text-sm tracking-[-1%]">
          From 2024-2025
        </h6>
      </div>
      <div>
        <CircleChevronRight className="size-5 text-[#4F4D55]" />
      </div>
    </div>
  );
};
