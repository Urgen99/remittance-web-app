import { selectCurrentUser } from "@/features/auth/auth.slice";
import { selectTransactionFormData } from "@/features/transactions/transactions.slice";
import { FormDescription } from "@/lib/type";
import { maskAccountNumber } from "@/utils/maskAccountNumber";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { SendMoneyForm } from "../../../../components/icons/Icons";
import FormHeadingDescription from "../../../../components/shared/FormHeadingDescription";
import NavigationButtons from "../../complete-profile/components/NavigationButtons";
import PaymentCountry from "./review-payment/PaymentCountry";
import PaymentDetailTable from "./review-payment/PaymentDetailTable";
import RecipientContainer from "./review-payment/RecipientContainer";
interface ReviewPaymentProps {
  handleNext: () => void;
  handlePrev: () => void;
}
const formDescription: FormDescription = {
  Icon: SendMoneyForm.ReviewPayment.Vote,
  title: "Review your payment",
  subtitle: "Review the payment details, make sure everything are correct",
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
    accountNumber: "1234567878901234",
  },

  // Receiver Details
  receiver: {
    name: "Jane Cooper",
    bankName: "prabhu bank limited",
    accountNumber: "1234567878901234",
  },

  // General Details
  date: new Date("2025-03-06T10:15:00Z"),
  channel: "mobile",
  remarks: "personal use",
  status: "pending",
  fee: 2, // in percentage
};

const ReviewPayment = ({ handleNext, handlePrev }: ReviewPaymentProps) => {
  const currentUser = useSelector(selectCurrentUser);
  const formState = useSelector(selectTransactionFormData);
  // select payment channel by browser

  const generalDetailsRows = [
    {
      label: "Sender name",
      value: currentUser?.split("@")[0],
    },
    {
      label: "Payment initiated date",
      value: format(new Date(), "yyyy-MM-dd"),
    },
    {
      label: "Payment Method",
      value: transactionDetails?.sender?.method,
    },
    {
      label: "Account number",
      value: maskAccountNumber(transactionDetails?.sender?.accountNumber),
    },
    {
      label: "Channel",
      value: "Web",
    },
    {
      label: "Remarks",
      value: formState?.remarks,
    },
  ];

  const recipientDetails = {
    name: `${formState?.beneficiaryFirstName} ${
      formState?.beneficiaryMiddleName && ` ${formState?.beneficiaryMiddleName}`
    } ${formState?.beneficiaryLastName}`,
    bankName: `${formState?.BankName}`,
    accountNumber: `${transactionDetails?.receiver?.accountNumber}`,
  };

  const headerData = {
    sendingAmount: parseInt(formState?.sendingAmount as string),
    payoutAmount: parseInt(formState?.payoutAmount as string),
    sendingCurrency: "AUD",
    payoutCurrency: "NPR",
    sendingCountryFlag: "/images/australia.svg",
    payoutCountryFlag: "/images/nepal.svg",
  };

  return (
    <section className="mt-7">
      <div className="flex flex-col gap-10 items-center justify-center ">
        <div className="items-center w-full">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        <div className="flex flex-col items-center gap-[18px] max-w-[35.15rem] w-full">
          <div className="max-w-[33.65rem] w-full">
            <PaymentCountry transaction={headerData} />
          </div>

          <div className="flex flex-col gap-6 items-center w-full">
            <div className="max-w-[33.65rem] w-full">
              <PaymentDetailTable rows={generalDetailsRows} />
            </div>
          </div>

          <div className="max-w-[33.65rem] w-full">
            <div className="space-y-4">
              <h3 className="font-roboto text-sm leading-[18px] tracking-[-1%] text-black">
                RECIPIENT
              </h3>

              <RecipientContainer recipientDetails={recipientDetails} />
            </div>
          </div>

          <div className="max-w-[50rem] flex flex-col items-center w-full gap-14">
            <NavigationButtons
              onBackClick={handlePrev}
              onContinueClick={handleNext}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewPayment;
