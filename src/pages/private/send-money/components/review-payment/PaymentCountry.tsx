import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDecimal } from "@/utils/formatDecimals";

type TransactionDetails = {
  sendingAmount: number;
  payoutAmount: number;
  sendingCurrency: string;
  payoutCurrency: string;
  sendingCountryFlag: string;
  payoutCountryFlag: string;
};

interface Props {
  transaction: TransactionDetails;
}

const PaymentCountry = ({ transaction }: Props) => {
  const {
    sendingAmount,
    payoutAmount,
    sendingCurrency,
    payoutCurrency,
    sendingCountryFlag,
    payoutCountryFlag,
  } = transaction;
  return (
    <div className="px-4 py-6 rounded-[6px] bg-[#2E2EB0] bg-gradient-to-b from-[#2E2EB0] to-[#0B3984]">
      <div className="flex justify-between items-center">
        {/* sender country */}
        <CountryDetails
          title="Sent amount"
          flag={sendingCountryFlag}
          currency={sendingCurrency}
          amount={sendingAmount}
        />

        {/* receiver country */}
        <CountryDetails
          title="Received amount"
          flag={payoutCountryFlag}
          currency={payoutCurrency}
          amount={payoutAmount}
          end={true}
        />
      </div>
    </div>
  );
};

export default PaymentCountry;

type CountryDetailsProps = {
  title: string;
  flag: string;
  currency: string;
  amount: number;
  end?: boolean;
};

const CountryDetails = ({
  title,
  flag,
  currency,
  amount,
  end = false,
}: CountryDetailsProps) => {
  const formattedAmount = formatDecimal(amount);

  return (
    <div className={`flex flex-col gap-4 ${end ? "items-end" : ""}`}>
      <Avatar className="size-7">
        <AvatarImage src={flag} alt={`${currency} flag`} />
        <AvatarFallback className="font-inter font-medium text-sm leading-[120%] tracking-[-0.5px] text-[#1751D0]">
          {currency}
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex flex-col gap-2 text-white ${end ? "items-end" : ""}`}
      >
        <h6 className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%]">
          {title}
        </h6>
        <h4 className="font-general-sans font-medium text-lg leading-[120%] tracking-[-2%]">
          {currency} <span>{formattedAmount}</span>
        </h4>
      </div>
    </div>
  );
};
