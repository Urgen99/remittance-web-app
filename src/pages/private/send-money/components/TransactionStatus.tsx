import { selectCurrentTransaction } from "@/features/transactions/transactions.slice";
import {
  TransactionByIdResponse,
  useGetTransactionByIdQuery,
} from "@/features/transactions/transactionsApi.slice";
import {
  getStatusColor,
  getTextColor,
  type TransactionStatus,
} from "@/lib/getColors";
import { FormDescription } from "@/lib/type";
import { maskAccountNumber } from "@/utils/maskAccountNumber";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { SendMoneyForm } from "../../../../components/icons/Icons";
import FormHeadingDescription from "../../../../components/shared/FormHeadingDescription";
import NavigationButtons from "../../complete-profile/components/NavigationButtons";
import PaymentCountry from "./review-payment/PaymentCountry";
import PaymentDetailTable from "./review-payment/PaymentDetailTable";
import { useNavigate } from "react-router-dom";

const formDescription: FormDescription = {
  Icon: SendMoneyForm.TransactionStatus.BillCheck,
  title: "Transaction status",
  subtitle:
    "Transaction request sent, the money will be sent within couple of days, be sure to track progress from transactions history tab",
};

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
    accountNumber: "1234567890123456",
  },

  // Receiver Details
  receiver: {
    name: "Jane Cooper",
    bankName: "prabhu bank limited",
    accountNumber: "1234567890123456",
  },

  // General Details
  date: new Date("2025-03-06T10:15:00Z"),
  channel: "mobile",
  remarks: "personal use",
  status: "pending",
  fee: 2, // in percentage
};

const transactionStatus = [
  {
    name: "Transfer initiated",
    date: "On 27 jan",
    status: "initiated",
    Icon: SendMoneyForm.TransactionStatus.CircleCheck,
  },
  {
    name: "In progress",
    date: "May take 1 day",
    status: "progress",
    Icon: SendMoneyForm.TransactionStatus.Downloading,
  },
  {
    name: "Delivered",
    date: "May take 1 day",
    status: "verifying",
    Icon: SendMoneyForm.TransactionStatus.Upgrade,
  },
];

type DetailsRowType = {
  label: string;
  value: string;
};

const generateDetailsRow = (data: TransactionByIdResponse) => {
  if (!data || Object.keys(data).length === 0) return [];

  const rows: DetailsRowType[] = [
    {
      label: "Sender name",
      value: transactionDetails?.sender?.name,
    },
    {
      label: "Payment initiated date",
      value: format(data.createdTs, "yyyy-MM-dd"),
    },
    {
      label: "Payment Method",
      value: data?.paymentTypeName,
    },
    {
      label: "Account number",
      value: maskAccountNumber(data?.accountName),
    },
    {
      label: "Channel",
      value: "Web",
    },
    {
      label: "Remarks",
      value: data?.remarks,
    },
  ];

  return rows;
};

const TransactionStatus = () => {
  const currentTransaction = useSelector(selectCurrentTransaction);

  const { data, isLoading } = useGetTransactionByIdQuery(
    currentTransaction as string
  );

  const navigate = useNavigate();

  const handleNext = () => navigate("/dashboard");

  const extractData = data && {
    sendingAmount: Number(data?.data?.sendingAmount.toFixed(2)),
    payoutAmount: Number(data?.data?.payoutAmount.toFixed(2)),
    channel: data?.data?.channel || "Web",
    remarks: data?.data?.remarks,
    accountName: data?.data?.accountName,
    paymentTypeName: data?.data?.paymentTypeName,
    createdTs: new Date().toISOString(),
    sendingCurrency: "AUD",
    payoutCurrency: "NPR",
    sendingCountryFlag: "/images/australia.svg",
    payoutCountryFlag: "/images/nepal.svg",
  };

  const generalDetailsRows = generateDetailsRow(extractData);

  return (
    <section className="mt-7 ">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[33.5rem] flex flex-col gap-14 items-center w-full">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM CONTAINER ---------- */}

        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="flex flex-col items-center gap-[18px] max-w-[35.15rem] w-full">
            <div className="w-full max-h-[31.5rem] overflow-y-scroll space-y-5">
              <div className="max-w-[33.65rem] w-full">
                <PaymentCountry transaction={extractData} />
              </div>

              <div className="max-w-[33.65rem] w-full space-y-4">
                <h3 className="font-roboto text-sm leading-[18px] tracking-[-1%] text-[#696969]">
                  PROGRESS ANALYSIS
                </h3>
                <ul className="rounded-[6px] space-y-2">
                  {transactionStatus.length > 0 &&
                    transactionStatus.map(
                      ({ name, date, status, Icon }: any) => (
                        <li
                          key={Math.random()}
                          className={`flex w-full px-3 py-4 border-l-[3px] shadow-xs ${
                            status === "initiated"
                              ? "bg-[#E3FFDC2B] border-[#388E3C]"
                              : status === "progress"
                              ? "bg-[#F9FAFF] border-[#3333C1]"
                              : "bg-white border-black"
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-3">
                              <div
                                className={`rounded-full size-7 flex items-center justify-center  ${
                                  status === "initiated"
                                    ? "bg-[#388E3C]"
                                    : status === "progress"
                                    ? "bg-[#3333C1]"
                                    : "bg-[#E0E0E0]"
                                }`}
                              >
                                <Icon />
                              </div>

                              <div className="space-y-2.5">
                                <h3 className="font-general-sans font-medium leading-5 tracking-[-1%] text-[#1b1b1b] text-base">
                                  {name}
                                </h3>
                                <p className="text-[#696969] font-roboto text-sm leading-[18px]">
                                  {date}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 ">
                              <div
                                className={`rounded-full w-1 h-2.5 ${getStatusColor(
                                  status
                                )}`}
                              />
                              <p
                                className={`capitalize ${getTextColor(status)}`}
                              >
                                {status}
                              </p>
                            </div>
                          </div>
                        </li>
                      )
                    )}
                </ul>
              </div>

              <div className="max-w-[33.65rem] w-full space-y-4">
                <h3 className="font-roboto text-sm leading-[18px] tracking-[-1%] text-[#696969]">
                  SENDER DETAILS
                </h3>
                <PaymentDetailTable rows={generalDetailsRows} />
              </div>
            </div>
            <div className="max-w-[50rem] flex flex-col items-center w-full gap-14">
              <NavigationButtons
                showBackButton={false}
                onContinueClick={handleNext}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionStatus;
