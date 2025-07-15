import { Country } from "@/pages/private/dashboard/components/CurrentTransactionRate";
import React from "react";
import DropDownCountries from "./DropDownCountries";
interface CountryAmountSelect {
  title: string;
  Icon: React.FC;
  country: Country;
  setCountry: React.Dispatch<React.SetStateAction<Country>>;
}
const CountryAmountSelect = ({
  title,
  Icon,
  country,
  setCountry,
}: CountryAmountSelect) => {
  return (
    <div className="h-6 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="bg-[#2FD366] size-6 rounded-full ">
          <Icon />
        </div>
        <p className="font-inter font-[475] text-sm leading-5 tracking-[-0.05px] text-[#2D2B32] ">
          {title} <span className="text-[#D32F2F]">*</span>
        </p>
      </div>
      <div className="flex items-center max-w-[5.25rem] w-full rounded-full border border-[#0000001A] py-1 pl-1 pr-1.5">
        <DropDownCountries country={country} setCountry={setCountry} />
      </div>
    </div>
  );
};

export default CountryAmountSelect;
