import NavigationButtons from "@/components/complete-profile/NavigationButtons";
import { SendMoneyForm } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/lib/type";
import { useMemo, useState } from "react";
import { Payment, PaymentStep } from "../PaymentInformation";
import LatestPayment from "./LatestPayment";

const formDescription: FormDescription = {
  Icon: SendMoneyForm.PaymentDetails.CardSend,
  title: "Enter payment information",
  subtitle:
    "Enter the card details of the from which you will be paying the amount",
};

interface PaymentDetailsProps {
  handleNext: () => void;
  handlePrev: () => void;
  paymentMethods: Payment[];
  onStepChange: (step: PaymentStep) => void;
}

const SavedPayments = ({
  paymentMethods,
  handleNext,
  handlePrev,
  onStepChange,
}: PaymentDetailsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<Payment | null>(null);

  const latestPayment = useMemo(
    () =>
      paymentMethods.reduce((latest, current) =>
        current.lastUsed > latest.lastUsed ? current : latest
      ),
    [paymentMethods]
  );

  const otherPayments = useMemo(
    () =>
      paymentMethods
        .filter((method) => method !== latestPayment)
        .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime()),
    [paymentMethods, latestPayment]
  );

  const handleSelect = (user: Payment) => {
    setSelectedMethod(user);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <section className="flex flex-col gap-6 items-center justify-center w-[50rem]">
      <div className="max-w-[33.5rem] flex flex-col gap-14 items-center w-full">
        {/* ---------- FORM DESCRIPTION ---------- */}
        <FormHeadingDescription formDescription={formDescription} />
      </div>

      {/* ---------- FORM CONTAINER ---------- */}
      {/* <FormProvider {...form}> */}
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-[7.5rem] justify-between w-full h-full"
      >
        <div className="space-y-4 max-w-2xl w-full">
          <Button
            onClick={() => onStepChange("enter-payment-details")}
            type="button"
            variant="ghost"
            className=" w-full cursor-pointer bg-[#EBEBF9] text-[#3333C1] font-mukta font-medium leading-7 h-10 pl-1.5 pr-4 !text-base py-1.5 justify-start"
          >
            <div className="size-7 bg-[#FBFBFB] rounded-full flex items-center justify-center">
              <SendMoneyForm.ReceiverDetails.UserAdd />
            </div>
            Add different payment method
          </Button>

          <ul className="mt-2 space-y-6">
            {/* Latest Payment */}
            <li
              onClick={() => handleSelect(latestPayment)}
              className={`cursor-pointer hover:bg-[#EBEBF9] rounded-[6px] border p-4 flex justify-between ${
                selectedMethod === latestPayment
                  ? "border-[#3333C12E] bg-[#EBEBF9]"
                  : "border-[#0000001A] bg-white"
              }`}
            >
              <div className="relative">
                <div className="absolute bg-[#3333C1] h-5 w-16 rounded-[4px] -top-7 -left-3.5">
                  <p className="text-white font-mukta text-xs text-center leading-[18.2px]">
                    Last used
                  </p>
                </div>
                <LatestPayment
                  bankName={latestPayment.bankName}
                  accountName={latestPayment.accountName}
                  accountNumber={latestPayment.accountNumber}
                />
              </div>

              {selectedMethod === latestPayment && (
                <SendMoneyForm.ReceiverDetails.Check />
              )}
            </li>

            {/* Other Payments */}
            {otherPayments.length > 0 && (
              <li className="flex flex-col gap-3">
                <h6 className="font-roboto text-xs leading-[22px] text-black">
                  OTHER SAVED PAYMENT METHODS
                </h6>

                <div className="space-y-3 max-h-[13.5rem] overflow-y-scroll">
                  {otherPayments.map((method) => (
                    <div
                      key={`${method.accountNumber}-${method.bankName}`}
                      onClick={() => handleSelect(method)}
                      className={`cursor-pointer hover:bg-[#EBEBF9] rounded-[6px] border p-4 flex justify-between ${
                        selectedMethod === method
                          ? "border-[#3333C12E] bg-[#EBEBF9]"
                          : "border-[#0000001A] bg-white"
                      }`}
                    >
                      <LatestPayment
                        bankName={method.bankName}
                        accountName={method.accountName}
                        accountNumber={method.accountNumber}
                      />

                      {selectedMethod === method && (
                        <SendMoneyForm.ReceiverDetails.Check />
                      )}
                    </div>
                  ))}
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col items-center w-full gap-14">
          <NavigationButtons
            onBackClick={handlePrev}
            //   disabled={!form.formState.isValid}
            type="submit"
            onContinueClick={handleSubmit}
          />
        </div>
      </form>
      {/* <DevTool control={form.control} /> */}
      {/* </FormProvider> */}
    </section>
  );
};

export default SavedPayments;
