import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import { Country } from "./CurrentTransactionRate";

interface DropDownCountriesProps {
  country: Country;
  setCountry: React.Dispatch<React.SetStateAction<Country>>;
}

// remove this fetch from db
const countries = [
  {
    name: "Nepal",
    code: "NPR",
    currency: "Nepalese Rupee",
    flag: "/images/nepal.svg",
  },
  {
    name: "India",
    code: "INR",
    currency: "Indian Rupee",
    flag: "/images/australia.svg",
  },
  {
    name: "Australia",
    code: "AUD",
    currency: "Australian Dollar",
    flag: "/images/australia.svg",
  },
  {
    name: "United States",
    code: "USD",
    currency: "United States Dollar",
    flag: "/images/australia.svg",
  },
  {
    name: "United Kingdom",
    code: "GBP",
    currency: "United Kingdom Pound",
    flag: "/images/nepal.svg",
  },
];

const DropDownCountries: React.FC<DropDownCountriesProps> = ({
  country,
  setCountry,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between gap-2 items-center">
          <div className="flex gap-2 items-center">
            <Avatar className="!size-[18px]">
              <AvatarImage src={country?.flag} alt={country?.name + "- flag"} />
              <AvatarFallback className="uppercase bg-[#2080F6] text-white font-inter font-medium tracking-[-0.5px]">
                {country?.name.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>{" "}
            <p className="font-roboto text-[#696969] text-sm tracking-[-1%] font-normal">
              {country?.name}
            </p>
          </div>{" "}
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {countries.map(({ name, code, currency, flag }) => (
          <DropdownMenuLabel
            onClick={() => setCountry({ name, code, currency, flag })}
            key={code}
            className="flex items-center gap-1.5"
          >
            <Avatar className="!size-[18px]">
              <AvatarImage src={flag} alt={name + "- flag"} />
              <AvatarFallback className="uppercase bg-[#2080F6] text-white font-inter font-medium tracking-[-0.5px]">
                {name.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
            <div className="px-1 flex flex-col gap-1">
              <h4 className="font-inter font-[475] text-sm tracking-[-0.05px] text-[#0a090b]">
                {name}
              </h4>
            </div>
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownCountries;
