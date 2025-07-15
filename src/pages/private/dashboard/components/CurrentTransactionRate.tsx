import IconTextContainer from "@/components/shared/IconTextContainer";
import { Card, CardContent } from "@/components/ui/card";
import { selectCurrentToken } from "@/features/auth/auth.slice";
import { useGetExchangeRatesQuery } from "@/features/exchange-rate/exchangeApi.slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import DropDownCountries from "./DropDownCountries";
import ExchangeRate from "./ExchangeRate";
export interface Country {
  id: number | string;
  name: string;
  iso2?: string;
  iso3: string;
  countryId: number | string;
  flag: string;
}

const defaultSender = {
  id: 1,
  name: "Nepal",
  iso2: "NP",
  iso3: "NPR",
  countryId: 1,
  flag: "/images/nepal.svg",
};

const defaultReceiver = {
  id: 2,
  name: "Australia",
  iso2: "AU",
  iso3: "AUD",
  countryId: 2,
  flag: "/images/australia.svg",
};
const CurrentTransactionRate = () => {
  const token = useSelector(selectCurrentToken);
  const [senderCountry, setSenderCountry] = useState<Country>(defaultSender);
  const [receiverCountry, setReceiverCountry] =
    useState<Country>(defaultReceiver);

  const {
    data,
    // isLoading, isError, error
  } = useGetExchangeRatesQuery(
    {
      SendingCountry: senderCountry.name,
      SendingCurrency: senderCountry.iso3,
      ReceivingCountry: receiverCountry.name,
      ReceivingCurrency: receiverCountry.iso3,
    },
    { skip: !token || !senderCountry || !receiverCountry }
  );
  const exchangeRate =
    data?.data?.map(({ rate }: { rate: number }) => rate) ?? [];
  const exchangeRateValue = exchangeRate.length > 0 ? exchangeRate[0] : 1;

  return (
    <>
      <div className="min-h-[12.7rem] max-w-[30.68rem] w-full rounded-[8px] border border-[#0000001A]">
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
                  currency={senderCountry.iso3}
                  amount={1}
                  code={senderCountry.iso3}
                />
              </div>
              <div className="flex flex-col gap-1">
                <DropDownCountries
                  country={receiverCountry}
                  setCountry={setReceiverCountry}
                />
                <ExchangeRate
                  currency={receiverCountry.iso3}
                  amount={1 * exchangeRateValue}
                  code={receiverCountry.iso3}
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
