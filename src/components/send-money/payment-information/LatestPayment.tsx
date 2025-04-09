import { SendMoneyForm } from "@/components/icons/Icons";
interface LatestPaymentProps {
  bankName: string;
  accountName: string;
  accountNumber: string;
}
const LatestPayment = ({
  bankName,
  accountName,
  accountNumber,
}: LatestPaymentProps) => {
  return (
    <div className="flex gap-3">
      <div className="bg-[#EBEBF9] border border-[#0D0D4B29] rounded-[4px] size-8 flex items-center justify-center">
        <SendMoneyForm.PaymentDetails.Bank />
      </div>
      <div className="space-y-1">
        <div className="tracking-[-1%] space-y-1">
          <h5 className="font-general-sans font-medium leading-5 text-[#222222]">
            {bankName}
          </h5>
          <h6 className="text-[#696969] font-roboto text-sm leading-[18px]">
            {accountName}
          </h6>
        </div>

        <p className="font-mukta leading-[18.2px]">
          <span className="text-[#1B1B1B] font-medium">Acc no:</span>{" "}
          <span className="text-[#696969]">{accountNumber}</span>
        </p>
      </div>
    </div>
  );
};

export default LatestPayment;
