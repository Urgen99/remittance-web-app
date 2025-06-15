import { SendMoneyForm } from "@/components/icons/Icons";
import { maskAccountNumber } from "@/utils/maskAccountNumber";

interface RecipientProps {
  name: string;
  bankName: string;
  accountNumber: string;
}
const RecipientContainer = ({
  recipientDetails,
}: {
  recipientDetails: RecipientProps;
}) => {
  const maskedAccountNumber = maskAccountNumber(
    recipientDetails?.accountNumber
  );

  return (
    <div
      className="bg-[#EBEBF9] p-2.5 rounded-[4px] bg-no-repeat"
      style={{
        backgroundImage: "url('/icons/reviewPaymentPattern.svg')",
        backgroundPosition: "calc(100% - 9.5rem) top",
      }}
    >
      <div className=" flex gap-4">
        <SendMoneyForm.ReceiverDetails.User />

        <div className="space-y-1">
          <div className="space-y-0.5">
            <h4 className="font-general-sans font-medium leading-5 tracking-[-1%] text-black">
              {recipientDetails?.name}
            </h4>
            <h6 className="capitalize font-roboto leading-6 tracking-[-1%] text-[#696969]">
              {recipientDetails?.bankName}
            </h6>
          </div>

          <p className="font-roboto text-sm leading-[18px] tracking-[-1%]">
            <span className="text-[#1B1B1B]">Acc no.</span>{" "}
            <span className="text-[#696969]">{maskedAccountNumber}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipientContainer;
