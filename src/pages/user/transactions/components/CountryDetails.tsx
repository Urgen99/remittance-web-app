import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currencyFormatter } from "@/lib/utils";
import React from "react";

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
  const formattedAmount = currencyFormatter(amount);

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
          {currency} <span>{formattedAmount}</span>
        </h4>
      </div>
    </div>
  );
};

export default CountryDetails;
