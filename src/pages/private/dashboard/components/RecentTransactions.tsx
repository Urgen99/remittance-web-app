import { TransactionIcons } from "@/components/icons/Icons";
import {
  ListItemBody,
  ListItemCard,
  ListItemFooter,
  ListItemHeader,
} from "@/components/shared/Generic/ListItemCard";
import {
  getStatusColor,
  getTextColor,
  TransactionStatus,
} from "@/lib/getColors";
import { Link } from "react-router-dom";

interface RecentTransactions {
  user: {
    recentTransactions: {
      id: string;
      amount: string;
      receiver: string;
      status: TransactionStatus;
      method: string;
    }[];
  };
}

const RecentTransactions: React.FC<RecentTransactions> = ({ user }) => {
  return (
    <>
      <div className="flex flex-col gap-4 max-w-[42rem] 2xl:max-w-full w-full">
        <div className="flex items-center justify-between">
          <h3 className="font-general-sans font-medium text-lg leading-[120%] tracking-[-2%] text-[#0A090B]">
            Recent transactions
          </h3>

          <Link
            to="/transactions"
            className="font-inter font-[475] text-[#3333C1] !text-sm leading-[20px] tracking-[-0.05px]"
          >
            View all transactions
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          {user?.recentTransactions.map(
            ({ id, amount, receiver, status, method }) => (
              <ListItemCard key={id}>
                <div className="flex gap-3 items-center">
                  <ListItemHeader Icon={TransactionIcons.ArrowRight} />
                  <ListItemBody title={`To ${receiver}`}>
                    <div className="flex items-center gap-1">
                      <div
                        className={`rounded-full w-1 h-2.5 ${getStatusColor(
                          status
                        )}`}
                      />
                      <p
                        className={`font-roboto text-sm leading-[20.8px] tracking-[-1%] capitalize ${getTextColor(
                          status
                        )}`}
                      >
                        {status}
                      </p>
                    </div>
                  </ListItemBody>
                </div>
                <ListItemFooter>
                  <div className="flex flex-col gap-4 items-end">
                    <h5 className="font-general-sans text-lg leading-[20.8px] font-medium tracking-[-2%] text-[#3333C1]">
                      $ {amount}
                    </h5>
                    <p className="font-roboto text-sm leading-[18px] tracking-[-1%] text-[#696969] font-normal">
                      {method}
                    </p>
                  </div>
                </ListItemFooter>
              </ListItemCard>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default RecentTransactions;
