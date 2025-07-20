import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetPaymentTypesQuery } from "@/features/reference-data/typePaymentApi.slice";
import { saveTransactionForm } from "@/features/transactions/transactions.slice";
import {
  AmountDetailSchema,
  AmountDetailSchemaType,
} from "@/lib/schemas/send-money/amountDetails";
import { FormDescription } from "@/lib/type";
import { Country } from "@/pages/private/dashboard/components/CurrentTransactionRate";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SendMoneyForm } from "../../../../components/icons/Icons";
import FormHeadingDescription from "../../../../components/shared/FormHeadingDescription";
import DropDownSelect from "../../../../components/ui/forms/DropDownSelect";
import TextInput from "../../../../components/ui/forms/TextInput";
import CountryAmountSelect from "../../../../components/ui/send-money/CountryAmountSelect";
import NavigationButtons from "../../complete-profile/components/NavigationButtons";
interface AmountDetailProps {
  handleNext: () => void;
}
const formDescription: FormDescription = {
  Icon: SendMoneyForm.AmountDetails.Dollar,
  title: "Send money",
  subtitle: "Enter the amount of money you want to send below.",
};

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

const deliveryMethods = [
  {
    value: "1",
    label: "Pickup",
  },
  {
    value: "2",
    label: "Delivery",
  },
];

type LabelValueParameter = {
  name: string;
  id: number;
};

type FormatLabelValue = {
  label: string;
  value: number;
};

const AmountDetails = ({ handleNext }: AmountDetailProps) => {
  const [loading, setLoading] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [senderCountry, setSenderCountry] = useState<Country>(defaultSender);
  const [receiverCountry, setReceiverCountry] =
    useState<Country>(defaultReceiver);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const amountDetails = useSelector(selectCurrentFormData);
  // console.log("Form data", amountDetails);

  const { data: paymentData } = useGetPaymentTypesQuery("PAYMENT_TYPE");

  const paymentMethods: FormatLabelValue[] = formatLabelValue(
    paymentData?.data as LabelValueParameter[]
  );

  const form = useForm<AmountDetailSchemaType>({
    mode: "all",
    resolver: zodResolver(AmountDetailSchema),
    defaultValues: {
      sendingCountryId: "",
      sendingCurrencyId: "",
      payoutCountryId: "",
      payoutCurrencyId: "",
      sendingAmount: "",
      paymentTypeId: "",
      deliveryMethodId: "",
      remarks: "",
    },
  });

  // remove this for now later fetch from db
  useEffect(() => {
    // AUD just for now;
    setLoading(true);
    const sendingAmount = form.watch("sendingAmount");
    const timeout = setTimeout(() => {
      setPayoutAmount(Number(sendingAmount) * 90);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [form.watch("sendingAmount")]);

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  function onSubmit(data: AmountDetailSchemaType) {
    dispatch(
      saveTransactionForm({
        ...data,
        sendingCountryId: senderCountry.countryId,
        sendingCurrencyId: senderCountry.id,
        payoutCountryId: receiverCountry.countryId,
        payoutCurrencyId: receiverCountry.id,
      })
    );

    handleNext();
  }

  return (
    <section className="mt-7 px-5 w-full flex justify-center items-center">
      <div className="flex flex-col gap-6 items-center justify-center max-w-[50rem] w-full">
        <div className="flex flex-col gap-14 items-center w-full">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM CONTAINER ---------- */}
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-8 md:gap-[7.5rem] justify-between w-full h-full"
          >
            <div className="flex flex-col md:max-w-[48.5rem] w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
                <div className="flex flex-col gap-2 w-full h-30">
                  <CountryAmountSelect
                    key="sender"
                    title={"YOU ARE SENDING"}
                    Icon={SendMoneyForm.AmountDetails.ArrowDownRight}
                    country={senderCountry}
                    setCountry={setSenderCountry}
                  />

                  <FormField
                    control={form.control}
                    name="sendingAmount"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative w-full flex items-center justify-between">
                          <FormControl>
                            <Input
                              className="px-3 py-1 h-12 border border-[#E6E6E6] font-general-sans font-medium text-[#000000] shadow-sm rounded-[8px]"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute right-4">
                            <div className="bg-[#F6F6F6] w-11 h-7 flex items-center justify-center rounded-[4px]">
                              <p className="font-mukta font-medium text-sm leading-[22px] text-[#1b1b1b]">
                                {senderCountry?.iso3}
                              </p>
                            </div>
                          </div>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="h-30 flex flex-col gap-2 w-full">
                  <CountryAmountSelect
                    key="receiver"
                    title={"THEY WILL RECEIVE"}
                    Icon={SendMoneyForm.AmountDetails.ArrowUpRight}
                    country={receiverCountry}
                    setCountry={setReceiverCountry}
                  />

                  <div className="relative px-3 w-full py-1 flex items-center justify-between shadow-sm rounded-[8px] h-12 border border-[#E6E6E6]">
                    <p className="font-general-sans font-medium text-[#5F5F5F]">
                      {loading ? "Loading..." : payoutAmount.toFixed(2)}
                    </p>

                    <div className="absolute right-4">
                      <div className="bg-[#F6F6F6] w-11 h-7 flex items-center justify-center rounded-[4px]">
                        <p className="font-mukta font-medium text-sm leading-[22px] text-[#1b1b1b]">
                          {receiverCountry?.iso3}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mt-1.5">
                <div className="flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
                  <DropDownSelect
                    name="paymentTypeId"
                    label="Select payment method"
                    isImportant
                    items={paymentMethods}
                    control={form.control}
                    placeholder="Select payment method"
                  />
                  <DropDownSelect
                    name="deliveryMethodId"
                    label="Select delivery options"
                    placeholder="Select delivery options"
                    isImportant
                    control={form.control}
                    items={deliveryMethods}
                  />
                </div>

                <div className="-mt-1.5 md:w-[49%]">
                  <TextInput
                    control={form.control}
                    name="remarks"
                    label="Enter remarks"
                    isImportant
                    placeholder="Enter remarks"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-full gap-14">
              <div className="max-w-3xl w-full">
                <div
                  id="platformFee"
                  className="select-none bg-[#EBEBF9] px-3 py-4 flex flex-col gap-2 relative"
                >
                  <div
                    id="feeInfo"
                    className="flex justify-between items-center font-mukta text-[#1b1b1b] leading-5"
                  >
                    <p className="uppercase">PLATFORM FEE</p>
                    <p className="uppercase">0 AUD</p>
                  </div>

                  <div className="bg-white size-3 rounded-full absolute -left-[5px] top-[38px]" />
                  <div className="bg-white size-3 rounded-full absolute -right-[5px] top-[38px]" />

                  <div
                    id="separator"
                    className="border border-black border-opacity-50 border-dashed"
                  />

                  <div
                    id="receiverAmountInfo"
                    className="flex justify-between items-center font-mukta font-medium"
                  >
                    <p className="text-[#1b1b1b]">Receiver will receive</p>
                    <p className="text-[#3333C1]">NPR 1800</p>
                  </div>
                </div>
              </div>

              <NavigationButtons
                onBackClick={handleBack}
                disabled={!form.formState.isValid}
                type="submit"
              />
            </div>
          </form>
          <DevTool control={form.control} />
        </FormProvider>
      </div>
    </section>
  );
};

export default AmountDetails;

function formatLabelValue(data: LabelValueParameter[]) {
  return (
    (data &&
      (data?.map(
        (item: LabelValueParameter) =>
          ({
            label: item?.name,
            value: item?.id,
          } as FormatLabelValue)
      ) as FormatLabelValue[] | undefined)) ||
    []
  );
}
