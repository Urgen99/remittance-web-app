import { SendMoneyForm } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import CheckBox from "@/components/ui/forms/CheckBox";
import TextInput from "@/components/ui/forms/TextInput";
import { saveTransactionForm } from "@/features/transactions/transactions.slice";
import {
  CardDetailsSchema,
  CardDetailsSchemaType,
} from "@/lib/schemas/send-money/amountDetails";
import { FormDescription } from "@/lib/type";
import NavigationButtons from "@/pages/private/complete-profile/components/NavigationButtons";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface PaymentDetailsProps {
  handleNext: () => void;
  handlePrev: () => void;
}

const formDescription: FormDescription = {
  Icon: SendMoneyForm.PaymentDetails.CardSend,
  title: "Enter payment information",
  subtitle:
    "Enter the card details of the from which you will be paying the amount",
};

const EnterPaymentDetails = ({
  handleNext,
  handlePrev,
}: PaymentDetailsProps) => {
  const dispatch = useDispatch();
  // const formState = useSelector(selectCurrentFormData);
  // console.log("PaymentDetails", formState);

  const form = useForm<CardDetailsSchemaType>({
    mode: "all",
    resolver: zodResolver(CardDetailsSchema),
    defaultValues: {
      CardHolderName: "",
      CardNumber: "",
      CardExpiry: "",
      CardCsv: "",
      SavePaymentInfo: false,
    },
  });
  function onSubmit(data: CardDetailsSchemaType) {
    dispatch(saveTransactionForm(data));
    handleNext();
  }
  return (
    <section className="flex flex-col gap-6 items-center justify-center">
      <div className="max-w-[33.5rem] flex flex-col gap-14 items-center w-full">
        {/* ---------- FORM DESCRIPTION ---------- */}
        <FormHeadingDescription formDescription={formDescription} />
      </div>

      {/* ---------- FORM CONTAINER ---------- */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-44 justify-between max-w-[50rem] w-full h-full"
        >
          <div className="w-full">
            <div className="w-full flex items-center gap-3">
              <TextInput
                name="CardHolderName"
                label="Card holder's name"
                isImportant
                placeholder="Enter card holder's name"
                control={form.control}
              />
              <TextInput
                name="CardNumber"
                label="Card number"
                isImportant
                placeholder="123456789XXXXXX"
                control={form.control}
              />
            </div>

            <div className="w-full flex items-center gap-3">
              <TextInput
                name="CardExpiry"
                label="Expiry date"
                isImportant
                placeholder="Eg:2025-12-11"
                control={form.control}
              />
              <TextInput
                name="CardCsv"
                label="Csv"
                isImportant
                placeholder="123"
                control={form.control}
              />
            </div>

            <div>
              <CheckBox
                name="SavePaymentInfo"
                label="Save this info for easier transfer"
                isImportant={false}
                control={form.control}
              />
            </div>
          </div>

          <div className="flex flex-col items-center w-full gap-14">
            <NavigationButtons
              onBackClick={handlePrev}
              disabled={!form.formState.isValid}
              type="submit"
            />
          </div>
        </form>
        <DevTool control={form.control} />
      </FormProvider>
    </section>
  );
};

export default EnterPaymentDetails;
