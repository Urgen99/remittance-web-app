import { DashboardIcons } from "@/components/icons/Icons";
import TextContainer from "@/components/shared/TextContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
interface Country {
  name: string;
  currency: string;
  flag: string;
  code: string;
}
const Dashboard = () => {
  const [senderCountry, setSenderCountry] = useState<Country>({
    name: "Australia",
    currency: "Australian Dollar",
    flag: "/images/australia.svg",
    code: "AUD",
  });
  const [receiverCountry, setReceiverCountry] = useState<Country>({
    name: "Nepal",
    currency: "Nepalese Rupee",
    flag: "/images/nepal.svg",
    code: "NPR",
  });

  return (
    <div className="border-2 border-red-500 min-h-screen flex flex-col gap-6">
      <div>
        <TextContainer title="Welcome, User" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-[0.5] bg-gradient-to-l from-[#7676d5] to-[#10108D] rounded-[8px]">
          <div className="p-4 bg-[url('/images/dashboard-bg.svg')] bg-contain bg-right bg-no-repeat flex justify-between items-center rounded-[8px]">
            <div className="max-w-[306px] w-full flex flex-col gap-5">
              <div className="text-white flex flex-col gap-4">
                <h3 className="max-w-[289px] font-general-sans text-xl font-medium tracking-[-2%]">
                  Earn $25 When You Refer a Friend! 🎉
                </h3>
                <p className="font-roboto font-normal text-sm tracking-[-1%]">
                  When your friend signs up and completes their first
                  transaction, you'll receive a $25 bonus
                </p>
              </div>
              <div>
                <Button className="bg-white text-[#3333C1] font-roboto font-normal text-sm tracking-[-1%] hover:bg-white">
                  Refer now
                </Button>
              </div>
            </div>

            <div className="max-w-[255px] w-full">
              <img src="/images/locker.png" />
            </div>
          </div>
        </div>

        <div className="flex-[0.5] p-4 rounded-[8px] border border-[#0000001A] flex flex-col gap-3">
          <div className="px-1 border-l-[3px] border-[#3B1AB2] flex gap-2 items-center">
            <h6 className="font-roboto font-normal text-base tracking-[-1%] text-[#1b1b1b]">
              Current transaction rate
            </h6>
            <DashboardIcons.Info />
          </div>

          <Card className="min-h-[8rem] rounded-[8px] justify-end p-0">
            <CardContent className="p-3 flex justify-between">
              <div className="flex flex-col gap-1">
                <DropDownCountries
                  country={senderCountry}
                  setCountry={setSenderCountry}
                />
                <ExchangeRate
                  currency={senderCountry.currency}
                  amount={1}
                  code={senderCountry.code}
                />
              </div>
              <div className="flex flex-col gap-1">
                <DropDownCountries
                  country={receiverCountry}
                  setCountry={setReceiverCountry}
                />
                <ExchangeRate
                  currency={receiverCountry.currency}
                  amount={1 * 87.5}
                  code={receiverCountry.code}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// remove this fetch from db
const countries = [
  {
    name: "Nepal",
    code: "NPR",
    currency: "Nepalese Rupee",
    flag: "/images/nepal.svg",
  },
  {
    name: "Australia",
    code: "AUD",
    currency: "Australian Dollar",
    flag: "/images/australia.svg",
  },
  {
    name: "United States of America",
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

interface DropDownCountriesProps {
  country: Country;
  setCountry: React.Dispatch<React.SetStateAction<Country>>;
}
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

interface ExchangeRate {
  currency: string;
  amount: number;
  code: string;
}
const ExchangeRate: React.FC<ExchangeRate> = ({ currency, amount, code }) => {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="font-inter font-[475] text-[#4F4D55] text-sm tracking-[-0.05px]">
        {currency}
      </h6>
      <h4 className="font-general-sans font-medium text-xl tracking-[-1%] text-[#1b1b1b]">
        {amount} {code}
      </h4>
    </div>
  );
};
