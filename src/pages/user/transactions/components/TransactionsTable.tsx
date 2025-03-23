import { TransactionIcons } from "@/components/icons/Icons";
import DataNotFound from "@/components/shared/DataNotFound";
import DataTable from "@/components/shared/Generic/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/lib/constant";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type UserTransaction = {
  id: string | number;
  user: { name: string; avatar?: string };
  amount: number;
  method: string;
  date: Date;
  status: string;
  actions?: string;
};

const statusColors: Record<string, string> = {
  initiated: "bg-[#EBEBF9] text-[#1E2CA8]",
  progress: "bg-[#FAEEE1] text-[#664301]",
  verifying: "bg-[#E5CCE8] text-[#7B008B]",
  completed: "bg-[#E1FAEA] text-[#016626]",
  delivered: "bg-[#E1FAEA] text-[#016626]",
};
const getStatusColor = (status: string) => statusColors[status];

const TransactionsTable = () => {
  const [sort, setSort] = useState("asc");

  const handleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
    console.log("I am clicked");
  };

  const columns: Array<{
    key: keyof UserTransaction;
    header: string;
    iconLeft?: React.ReactNode;
    iconRight?: {
      icon: React.ReactNode;
      onClick: () => void;
    };

    render?: (data: UserTransaction[keyof UserTransaction]) => React.ReactNode;
  }> = [
    {
      key: "user",
      header: "recipient name",
      iconLeft: <TransactionIcons.Person />,

      render: (user) => {
        const { name, avatar } = user as UserTransaction["user"];

        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage src={avatar} alt={`${name}'s profile`} />
              <AvatarFallback className="font-inter font-medium text-sm leading-[120%] tracking-[-0.5px] text-[#1751D0]">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h6 className="font-inter font-[550] text-sm leading-5 tracking-[-0.02px] text-[#0A090B]">
              {name}
            </h6>
          </div>
        );
      },
    },
    {
      key: "amount",
      header: "amount",
      iconLeft: <TransactionIcons.Dollar />,
      render: (amount) => (
        <div className="px-2">
          <p>${Number(amount).toFixed(2)}</p>
        </div>
      ),
    },
    {
      key: "method",
      header: "method",
      iconLeft: <TransactionIcons.Method />,
      iconRight: {
        icon: (
          <TransactionIcons.ArrowDown
            className={`transition-all ease-in duration-150 ${
              sort === "asc" ? "" : "rotate-180"
            }`}
          />
        ),
        onClick: () => handleSort(),
      },
      render: (method) => (
        <div className="px-2">
          <p>{String(method)}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "sent on",
      iconLeft: <TransactionIcons.Calendar />,
      render: (date) => (
        <div className="px-2">
          {date instanceof Date ? (
            <>{date.toLocaleDateString("en-GB")}</>
          ) : (
            <>-</>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "status",
      iconLeft: <TransactionIcons.Golf />,
      render: (status) => (
        <div
          className={`w-fit flex items-center justify-center capitalize font-inter font-[475] text-sm leading-4 h-7 px-[5px] py-[3px] rounded-[5px] ${getStatusColor(
            String(status)
          )}`}
        >
          {String(status)}
        </div>
      ),
    },
    {
      key: "id",
      header: "actions",
      render: (id) => (
        <div className="w-full flex items-center justify-center">
          <Link
            title="View Transaction"
            to={`/transaction-details/${id}`}
            className="cursor-pointer flex items-center justify-center max-w-16 w-full h-8 p-1.5 rounded border border-[#E6E6E6] shadow-sm"
          >
            <EyeIcon className="size-5" />
          </Link>
        </div>
      ),
    },
  ];

  const rows = user.transactions;

  return rows.length > 0 ? (
    <DataTable<UserTransaction> rows={rows} columns={columns} />
  ) : (
    <div className="w-full h-full">
      <DataNotFound />
    </div>
  );
};

export default TransactionsTable;
