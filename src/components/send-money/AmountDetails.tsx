import { FormDescription } from "@/lib/type";
import { Country } from "@/pages/user/dashboard/components/CurrentTransactionRate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../complete-profile/NavigationButtons";
import { SendMoneyForm } from "../icons/Icons";
import FormHeadingDescription from "../shared/FormHeadingDescription";
import CountryAmountSelect from "../ui/send-money/CountryAmountSelect";
import DropDownSelect from "../ui/send-money/DropDownSelect";
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
    value: "applePay",
    label: "Apple Pay",
  },
  {
    value: "googlePay",
    label: "Google Pay",
  },
  {
    value: "stripe",
    label: "Stripe",
  },
];

const AmountDetails = ({ handleNext }: AmountDetailProps) => {
  const [senderCountry, setSenderCountry] = useState<Country>(defaultSender);
  const [receiverCountry, setReceiverCountry] =
    useState<Country>(defaultReceiver);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };
  return (
    <section className="mt-7 ">
      <div className="flex flex-col gap-6 items-center justify-center w-[50rem]">
        <div className="flex flex-col gap-14 items-center w-full">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM CONTAINER ---------- */}
        {/* <FormProvider {...form}> */}
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-[7.5rem] justify-between w-full h-full"
        >
          <div className="space-y-4 max-w-[48.5rem] w-full">
            <div className="flex items-center gap-3">
              <CountryAmountSelect
                title={"YOU ARE SENDING"}
                Icon={SendMoneyForm.AmountDetails.ArrowDownRight}
                country={senderCountry}
                setCountry={setSenderCountry}
                isSender
              />

              <CountryAmountSelect
                title={"THEY WILL RECEIVE"}
                Icon={SendMoneyForm.AmountDetails.ArrowUpRight}
                country={receiverCountry}
                setCountry={setReceiverCountry}
                isSender={false}
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <DropDownSelect
                  name="paymentMethod"
                  label="Select payment method"
                  isImportant
                  items={paymentMethods}
                  // defaultValue={paymentMethods[0].value}
                />
                <DropDownSelect
                  name="paymentMethod"
                  label="Select delivery options"
                  isImportant
                  items={paymentMethods}
                  // defaultValue={paymentMethods[0].value}
                />
              </div>
              <div className="-mt-3 w-[49%]">
                <DropDownSelect
                  name="paymentMethod"
                  label="Enter remarks"
                  isImportant
                  items={paymentMethods}
                  // defaultValue={paymentMethods[0].value}
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

                <div className="bg-white size-3 rounded-full absolute -left-[5px]  top-[38px]" />
                <div className="bg-white size-3 rounded-full absolute -right-[5px] top-[38px]" />

                <div
                  id="separator"
                  className=" border border-black border-opacity-50 border-dashed"
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
              //   disabled={!form.formState.isValid}
              type="submit"
              onContinueClick={handleSubmit}
            />
          </div>
        </form>
        {/* <DevTool control={form.control} /> */}
        {/* </FormProvider> */}
      </div>
    </section>
  );
};

export default AmountDetails;
