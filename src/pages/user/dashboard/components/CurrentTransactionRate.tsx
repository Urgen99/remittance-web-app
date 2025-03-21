import IconTextContainer from "@/components/shared/IconTextContainer";
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
      <div className="min-h-[12.7rem] max-w-[30.68rem] 2xl:max-w-full w-full rounded-[8px] border border-[#0000001A]">
        <div className="p-4 flex flex-col gap-3">
          <IconTextContainer title="Current transaction rate" />

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
    </>
  );
};

export default CurrentTransactionRate;
