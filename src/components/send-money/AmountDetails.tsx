import {
  AmountDetailSchema,
  AmountDetailSchemaType,
} from "@/lib/schemas/send-money/amountDetails";
import { FormDescription } from "@/lib/type";
import { Country } from "@/pages/user/dashboard/components/CurrentTransactionRate";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../complete-profile/NavigationButtons";
import { SendMoneyForm } from "../icons/Icons";
import FormHeadingDescription from "../shared/FormHeadingDescription";
import DropDownSelect from "../ui/forms/DropDownSelect";
import TextInput from "../ui/forms/TextInput";
import CountryAmountSelect from "../ui/send-money/CountryAmountSelect";
interface AmountDetailProps {
  handleNext: () => void;
}
const formDescription: FormDescription = {
  Icon: SendMoneyForm.AmountDetails.Dollar,
  title: "Send money",
  subtitle: "Enter the amount of money you want to send below.",
};

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

const paymentMethods = [
  {
    value: "card",
    label: "Card",
  },
  {
    value: "apple-pay",
    label: "Apple Pay",
  },
  {
    value: "google-pay",
    label: "Google Pay",
  },
  {
    value: "stripe",
    label: "Stripe",
  },
];

const deliveryMethods = [
  {
    value: "pickup",
    label: "Pickup",
  },
  {
    value: "delivery",
    label: "Delivery",
  },
];

const AmountDetails = ({ handleNext }: AmountDetailProps) => {
  const [senderCountry, setSenderCountry] = useState<Country>(defaultSender);
  const [receiverCountry, setReceiverCountry] =
    useState<Country>(defaultReceiver);
  const navigate = useNavigate();

  const form = useForm<AmountDetailSchemaType>({
    mode: "all",
    resolver: zodResolver(AmountDetailSchema),
    defaultValues: {
      SendingCountry: "Australia",
      SendingCurrency: "AUD",
      ReceivingCountry: "Nepal",
      ReceivingCurrency: "NPR",
      SendingAmount: "",
      PaymentType: "card",
      DeliveryType: "delivery",
      Remarks: "",
    },
  });

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  function onSubmit(data: AmountDetailSchemaType) {
    const formData = {
      ...data,
      SendingCountry: senderCountry.name,
      SendingCurrency: senderCountry.code,
      ReceivingCountry: receiverCountry.name,
      ReceivingCurrency: receiverCountry.code,
    };

    console.log(formData);
    handleNext();
  }

  return (
    <section className="mt-7 px-5 w-full flex justify-center items-center ">
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
            <div className="flex flex-col gap-4 md:max-w-[48.5rem] w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
                <CountryAmountSelect
                  key="sender"
                  title={"YOU ARE SENDING"}
                  Icon={SendMoneyForm.AmountDetails.ArrowDownRight}
                  country={senderCountry}
                  setCountry={setSenderCountry}
                  isSender
                  control={form.control}
                />

                <CountryAmountSelect
                  key="receiver"
                  title={"THEY WILL RECEIVE"}
                  Icon={SendMoneyForm.AmountDetails.ArrowUpRight}
                  country={receiverCountry}
                  setCountry={setReceiverCountry}
                  isSender={false}
                />
              </div>

              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-3 transition-all ease-in-out duration-300">
                  <DropDownSelect
                    name="PaymentType"
                    label="Select payment method"
                    isImportant
                    items={paymentMethods}
                    control={form.control}
                    defaultValue={paymentMethods[0].value}
                    placeholder="Select payment method"
                  />
                  <DropDownSelect
                    name="DeliveryType"
                    label="Select delivery options"
                    placeholder="Select delivery options"
                    isImportant
                    control={form.control}
                    items={deliveryMethods}
                    defaultValue={deliveryMethods[0].value}
                  />
                </div>
                <div className="-mt-3 md:w-[49%]">
                  <TextInput
                    control={form.control}
                    name="Remarks"
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
