import { TransactionIcons } from "@/components/icons/Icons";
import IconTextContainer from "@/components/shared/IconTextContainer";
import { maskAccountNumber } from "@/lib/utils";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const AccountDetails = ({ user }: { user: any }) => {
  const totalAmount: number = user?.transactions.reduce(
    (sum: number, { amount }: { amount: number }) => sum + amount,
    0
  );
  const totalTransactions = user?.transactions.length;
  const lastTransactionDate =
    user.transactions.length > 0
      ? new Date(
          Math.max(
            ...user.transactions.map(({ date }: { date: string | Date }) =>
              new Date(date).getTime()
            )
          )
        )
      : undefined;

  const accountDetails = [
    {
      Icon: TransactionIcons.Deposit,
      title: "Total Amount",
      subtitle: `AUD ${totalAmount.toString()}`,
    },
    {
      Icon: TransactionIcons.RedoSpark,
      title: "Total Time",
      subtitle: `${totalTransactions} Times`,
    },
    {
      Icon: TransactionIcons.ArrowTransfer,
      title: "Last Sent",
      subtitle: moment(lastTransactionDate).format("DD/MM/YY") || "N/A",
    },
  ];

  const rows = [
    { label: "Bank name", value: user?.bankName },
    { label: "Account number", value: maskAccountNumber(user?.accountNumber) },
  ];
  return (
    <div className="flex flex-col gap-4 ">
      <div className="bg-[#FBFBFB] rounded-[8px] flex items-center justify-between px-2.5 py-6">
        {accountDetails.map(({ Icon, title, subtitle }) => (
          <TextContainer
            key={title}
            Icon={Icon}
            title={title}
            subtitle={subtitle}
          />
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <div className="w-full rounded-[12px] border border-[#0000001A] px-4 py-3">
          <div className="flex justify-between">
            <IconTextContainer title="Bank details" />

            <Link
              to="/recipients"
              className="font-inter font-[475] text-[#3333C1] !text-sm leading-[20px] tracking-[-0.05px]"
            >
              View all people
            </Link>
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
                    <p className="font-roboto font-normal text-[#696969] tracking-[-1%] text-base leading-6">
                      {label}
                    </p>
                    <p className="text-[#1b1b1b] capitalize">{value}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;

type TextContainerProps = {
  Icon: React.FC;
  title: string;
  subtitle: string;
};

const TextContainer: React.FC<TextContainerProps> = ({
  Icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5">
        <Icon />
      </div>

      <div className="flex flex-col gap-3">
        <h5 className="uppercase font-roboto font-normal text-xs leading-[22px] text-[#696969]">
          {title}
        </h5>
        <h4 className="font-general-sans font-medium text-base leading-[20.8px] text-[#1b1b1b] tracking-[-1%]">
          {subtitle}
        </h4>
      </div>
    </div>
  );
};
