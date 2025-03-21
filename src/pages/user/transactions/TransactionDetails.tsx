import { TransactionIcons } from "@/components/icons/Icons";
import TextContainer from "@/components/shared/TextContainer";
import { Button } from "@/components/ui/button";
import CountryDetails from "./components/CountryDetails";
import DetailsTable from "./components/DetailsTable";
import moment from "moment";

// import { useParams } from "react-router-dom";
const transactionDetails = {
  id: "1123AVC12",
  amount: 120000,
  // country details
  sentFrom: {
    name: "Australia",
    currency: "AUD",
    code: "AU",
    flag: "/images/australia.svg",
  },
  sentTo: {
    name: "Nepal",
    currency: "NPR",
    code: "NP",
    flag: "/images/nepal.svg",
  },

  // Sender Details
  sender: {
    method: "bank transfer",
    name: "Bessie Cooper",
    bankName: "global ime bank",
    accountNumber: "1234 5678 #### ####",
  },

  // Receiver Details
  receiver: {
    name: "Jane Cooper",
    bankName: "prabhu bank limited",
    accountNumber: "1234 5678 #### ####",
  },

  // General Details
  date: new Date("2025-03-06T10:15:00Z"),
  channel: "mobile",
  remarks: "personal use",
  status: "pending",
  fee: 2, // in percentage
};
const statusColors: Record<string, string> = {
  initiated: "bg-[#EBEBF9] text-[#1E2CA8]",
  pending: "bg-[#EBEBF9] text-[#1E2CA8]",
  progress: "bg-[#FAEEE1] text-[#664301]",
  verifying: "bg-[#E5CCE8] text-[#7B008B]",
  completed: "bg-[#E1FAEA] text-[#016626]",
  delivered: "bg-[#E1FAEA] text-[#016626]",
};

const getStatusColor = (status: string) => statusColors[status];

const TransactionDetails = () => {
  const senderDetailsRows = [
    {
      label: "Payment method",
      value: transactionDetails?.sender?.method,
    },
    {
      label: "Sender name",
      value: transactionDetails?.sender?.name,
    },
    {
      label: "Sender bank Name",
      value: transactionDetails?.sender?.bankName,
    },
    {
      label: "Account number",
      value: transactionDetails?.sender?.accountNumber,
    },
  ];

  const receiverDetailsRows = [
    {
      label: "Receiver name",
      value: transactionDetails?.receiver?.name,
    },
    {
      label: "Bank Name",
      value: transactionDetails?.receiver?.bankName,
    },
    {
      label: "Account number",
      value: transactionDetails?.receiver?.accountNumber,
    },
  ];

  const generalDetailsRows = [
    {
      label: "Initiated on",
      value: moment(transactionDetails.date).format("l"),
    },
    {
      label: "Channel",
      value: transactionDetails?.channel,
    },
    {
      label: "Remarks",
      value: transactionDetails?.remarks,
    },
    {
      label: "Exchange rate",
      value: `1 AUD = 87.50 NPR`,
    },
    {
      label: "Status",
      value: (
        <div
          className={`rounded-[5px] h-6 px-[5px] py-[3px] ${getStatusColor(
            transactionDetails?.status
          )}`}
        >
          <p className="font-inter font-[475] text-[13px] leading-[16px]">
            {transactionDetails?.status}
          </p>
        </div>
      ),
    },
    {
      label: "Fee",
      value: `${transactionDetails?.fee}% (1 AUD)`,
    },
  ];
  // const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <div>
        <TextContainer
          title="Transaction Details"
          subtitle="View the transaction details of selected transactions"
        />
      </div>

      <div className="p-3 shadow-xs rounded-[12px] flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h4 className="font-general-sans font-medium text-lg tracking-[-1%] text-[#1b1b1b]">
              Transaction # {transactionDetails?.id}
            </h4>
            <Button variant="ghost" size="icon" className="size-fit">
              <TransactionIcons.Copy />
            </Button>
          </div>

          <div>
            <Button
              variant="outline"
              className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#4F4D55] rounded-[6px] shadow-xs "
            >
              <TransactionIcons.AddSquare />
              <p>Export Data</p>
            </Button>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="flex flex-col gap-6">
          {/* top content */}
          <div className="px-4 py-6 rounded-[6px] bg-[#2E2EB0] bg-gradient-to-b from-[#2E2EB0] to-[#0B3984]">
            <div className="flex justify-between items-center">
              {/* sender country */}
              <CountryDetails
                title="Sent amount"
                flag={transactionDetails?.sentFrom?.flag}
                name={transactionDetails?.sentFrom?.name}
                currency={transactionDetails?.sentFrom?.currency}
                amount={transactionDetails?.amount}
                code={transactionDetails?.sentFrom?.code}
              />
              {/* receiver country */}
              <CountryDetails
                title="Received amount"
                flag={transactionDetails?.sentTo?.flag}
                name={transactionDetails?.sentTo?.name}
                currency={transactionDetails?.sentTo?.currency}
                amount={transactionDetails?.amount * 100}
                code={transactionDetails?.sentTo?.code}
                end={true}
              />
            </div>
          </div>

          {/* bottom content */}
          <div className="flex justify-between gap-4">
            <div className="max-w-[35.5rem] w-full flex flex-col gap-6">
              <DetailsTable
                tableLabel="Sender details"
                rows={senderDetailsRows}
              />
              <DetailsTable
                tableLabel="Receiver details"
                rows={receiverDetailsRows}
              />
            </div>
            <div className="max-w-[35.5rem] w-full">
              <DetailsTable
                tableLabel="General details"
                rows={generalDetailsRows}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
