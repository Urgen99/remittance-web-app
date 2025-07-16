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
const currencies = [
  {
    id: 1,
    name: "Nepal",
    iso2: "NP",
    iso3: "NPR",
    countryId: 1,
    flag: "/images/nepal.svg",
  },
  {
    id: 2,
    name: "Australia",
    iso2: "AU",
    iso3: "AUD",
    countryId: 2,
    flag: "/images/australia.svg",
  },
  {
    id: 3,
    name: "United States of America",
    iso2: "US",
    iso3: "USD",
    countryId: 3,
    flag: "/images/australia.svg",
  },
  {
    id: 4,
    name: "United Kingdom",
    iso2: "GB",
    iso3: "GBP",
    countryId: 4,
    flag: "/images/nepal.svg",
  },
  {
    id: 5,
    name: "India",
    iso2: "IN",
    iso3: "INR",
    countryId: 5,
    flag: "/images/australia.svg",
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
        {currencies.map(({ countryId, name, iso3, flag, id }) => (
          <DropdownMenuLabel
            onClick={() => setCountry({ name, flag, countryId, iso3, id })}
            key={iso3}
            className="cursor-pointer flex items-center gap-1.5 hover:bg-[#EBEBF9] rounded-sm hover:text-[#1E2CA8] text-[#0a090b] transition-colors ease-linear duration-200"
          >
            <Avatar className="!size-[18px]">
              <AvatarImage src={flag} alt={name + "- flag"} />
              <AvatarFallback className="uppercase bg-[#2080F6] text-white font-inter font-medium tracking-[-0.5px]">
                {name.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
            <div className="px-1 flex flex-col gap-1">
              <h4 className="font-inter font-[475] text-sm tracking-[-0.05px]">
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
