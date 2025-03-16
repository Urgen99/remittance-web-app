import { DashboardIcons } from "@/components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import DropDownCountries from "./DropDownCountries";
import ExchangeRate from "./ExchangeRate";
export interface Country {
  name: string;
  currency: string;
  flag: string;
  code: string;
}

const defaultSender = {
  name: "Australia",
  currency: "Australian Dollar",
  flag: "/images/australia.svg",
  code: "AUD",
};

const defaultReceiver = {
  name: "Nepal",
  currency: "Nepalese Rupee",
  flag: "/images/nepal.svg",
  code: "NPR",
};
const CurrentTransactionRate = () => {
  const [senderCountry, setSenderCountry] = useState<Country>(defaultSender);
  const [receiverCountry, setReceiverCountry] =
    useState<Country>(defaultReceiver);

  return (
    <>
      <div className="min-h-[12.7rem] flex-[0.4] p-4 rounded-[8px] border border-[#0000001A] flex flex-col gap-3">
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
    </>
  );
};

export default CurrentTransactionRate;
