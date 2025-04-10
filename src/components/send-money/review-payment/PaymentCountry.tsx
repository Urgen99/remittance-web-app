import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface TransactionDetails {
  sentFrom: Country;
  sentTo: Country;
  amount: number;
}

type Country = {
  flag: string;
  name: string;
  currency: string;
  code: string;
};

const PaymentCountry = ({
  transaction,
}: {
  transaction: TransactionDetails;
}) => {
  return (
    <div className="px-4 py-6 rounded-[6px] bg-[#2E2EB0] bg-gradient-to-b from-[#2E2EB0] to-[#0B3984]">
      <div className="flex justify-between items-center">
        {/* sender country */}
        <CountryDetails
          title="Sent amount"
          flag={transaction?.sentFrom?.flag}
          name={transaction?.sentFrom?.name}
          currency={transaction?.sentFrom?.currency}
          amount={transaction?.amount}
          code={transaction?.sentFrom?.code}
        />
        {/* receiver country */}
        <CountryDetails
          title="Received amount"
          flag={transaction?.sentTo?.flag}
          name={transaction?.sentTo?.name}
          currency={transaction?.sentTo?.currency}
          amount={transaction?.amount * 100}
          code={transaction?.sentTo?.code}
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
  name: string;
  currency: string;
  amount: number;
  code: string;
  end?: boolean;
};

const CountryDetails: React.FC<CountryDetailsProps> = ({
  title,
  flag,
  name,
  currency,
  amount,
  code,
  end = false,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${end ? "items-end" : ""}`}>
      <Avatar className="size-7">
        <AvatarImage src={flag} alt={`${name} flag`} />
        <AvatarFallback className="font-inter font-medium text-sm leading-[120%] tracking-[-0.5px] text-[#1751D0]">
          {code}
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex flex-col gap-2 text-white ${end ? "items-end" : ""}`}
      >
        <h6 className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%]">
          {title}
        </h6>
        <h4 className="font-general-sans font-medium text-lg leading-[120%] tracking-[-2%]">
          {currency} <span>{amount}</span>
        </h4>
      </div>
    </div>
  );
};
