import { terms, Terms } from "@/lib/constant";
import {
  TermsSchema,
  TermsSchemaType,
} from "@/lib/schemas/send-money/amountDetails";
import { FormDescription } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import NavigationButtons from "../../complete-profile/components/NavigationButtons";
import { SendMoneyForm } from "../../../../components/icons/Icons";
import FormHeadingDescription from "../../../../components/shared/FormHeadingDescription";
import CheckBox from "../../../../components/ui/forms/CheckBox";
import { FormMessage } from "@/components/ui/form";

interface PaymentTermsProps {
  handleNext: () => void;
  handlePrev: () => void;
}
const formDescription: FormDescription = {
  Icon: SendMoneyForm.TermsConditions.Document,
  title: "Terms and conditions",
  subtitle:
    "Please carefully read terms and condition and accept after reading",
};

const PaymentTerms = ({ handleNext, handlePrev }: PaymentTermsProps) => {
  const form = useForm<TermsSchemaType>({
    mode: "all",
    resolver: zodResolver(TermsSchema),
    // defaultValues: { TermsAccepted: false },
  });

  function onSubmit(data: TermsSchemaType) {
    alert(data);
    handleNext();
  }

  return (
    <section className="mt-7 ">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-14 items-center w-full">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        <div className="max-w-[32.35rem] w-full space-y-[58px]">
          <div className="max-w-[32.2rem] space-y-4">
            <div className="max-h-[27rem] overflow-y-scroll border-[#E0E0E0] border px-6 py-4 shadow-xs rounded-[12px]">
              <TermsLists terms={terms} />
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CheckBox
                  name="TermsAccepted"
                  label="I agree with Eagle Remit's terms and condition and usage policy"
                  isImportant
                  control={form.control}
                />
              </form>
            </FormProvider>
          </div>
          <div className="max-w-[50rem] flex flex-col items-center w-full gap-14">
            <NavigationButtons
              onBackClick={handlePrev}
              disabled={!form.formState.isValid}
              onContinueClick={handleNext}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentTerms;

const TermsLists = ({ terms }: { terms: Terms[] }) => {
  return (
    <ol className="flex flex-col gap-6">
      {terms.map(
        ({ title, content, subContent, conclusion }, index: number) => (
          <li key={Math.random()} className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <h3 className="font-general-sans font-medium text-lg leading-5 tracking-[-2%] text-[#1b1b1b]">
                {index + 1}. {title}
              </h3>
              <p className="font-roboto font-normal text-base leading-6 tracking-[-1%] text-[#696969]">
                {content}
              </p>

              {subContent && (
                <ul className="ml-1 list-disc list-inside">
                  {subContent.map(({ title, content }) => (
                    <li className="font-roboto font-normal text-base leading-6 tracking-[-1%]">
                      <span className="text-[#1B1B1B]">{title}:</span>{" "}
                      <span className="text-[#696969]">{content}</span>
                    </li>
                  ))}
                </ul>
              )}

              {conclusion && (
                <p className="font-roboto font-normal text-base leading-6 tracking-[-1%] text-[#696969]">
                  {conclusion}
                </p>
              )}
            </div>

            {terms.length - 1 !== index && (
              <div className="border border-[#E0E0E0]" />
            )}
          </li>
        )
      )}
    </ol>
  );
};
