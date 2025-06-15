import { Country } from "@/pages/private/dashboard/components/CurrentTransactionRate";
import React from "react";
import DropDownCountries from "./DropDownCountries";
import { Input } from "../input";
import { FormField } from "../form";
interface CountryAmountSelect {
  title: string;
  Icon: React.FC;
  country: Country;
  setCountry: React.Dispatch<React.SetStateAction<Country>>;
  isSender?: boolean;
  control?: any;
}
const CountryAmountSelect = ({
  title,
  Icon,
  country,
  setCountry,
  isSender = false,
  control,
}: CountryAmountSelect) => {
  return (
    <div className="flex flex-col gap-2 w-full">
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

      <div className="relative px-3 w-full py-1 flex items-center justify-between shadow-sm rounded-[8px] h-12 border border-[#E6E6E6]">
        {isSender ? (
          <FormField
            control={control}
            name="SendingAmount"
            render={({ field }) => (
              <Input
                className="px-0 outline-0 ring-0 border-0 font-general-sans font-medium text-[#000000]"
                placeholder="0.00"
                {...field}
              />
            )}
          />
        ) : (
          <p className="font-general-sans font-medium text-[#5F5F5F]">
            loading... {/*converted amount goes here*/}
          </p>
        )}
        <div className="absolute right-4">
          <div className="bg-[#F6F6F6] w-11 h-7 flex items-center justify-center rounded-[4px]">
            <p className="font-mukta font-medium text-sm leading-[22px] text-[#1b1b1b]">
              {country.code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryAmountSelect;
