import NavigationButtons from "@/components/complete-profile/NavigationButtons";
import { FormIcons, SendMoneyForm } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/lib/type";

const formDescription: FormDescription = {
  Icon: SendMoneyForm.ReceiverDetails.ArchiveDown,
  title: "Enter receiver's details",
  subtitle:
    "Since you've already saved the receiver details, you can select an existing one or add a new recipient.",
};

interface RecipientDetailsProps {
  handleNext: () => void;
  handlePrev: () => void;
}

const recipients = [
  {
    name: "Ranjit Kumar Shrestha",
    bankName: "Nepal Bank Limited",
    accountNumber: "123456789XXXXXXX",
  },
  {
    name: "Ranjit Kumar Shrestha",
    bankName: "Nepal Bank Limited",
    accountNumber: "123456789XXXXXXX",
  },
  {
    name: "Ranjit Kumar Shrestha",
    bankName: "Nepal Bank Limited",
    accountNumber: "123456789XXXXXXX",
  },
];

const SavedRecipients = ({ handleNext, handlePrev }: RecipientDetailsProps) => {
  const handleSubmit = (e) => {
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
        <div className="space-y-4 max-w-2xl w-full border-red-500 border-2">
          <Button
            variant="ghost"
            className="w-full bg-[#EBEBF9] text-[#3333C1] font-mukta font-medium leading-7 h-10 pl-1.5 pr-4 !text-base py-1.5 justify-start"
          >
            <div className="size-7 bg-[#FBFBFB] rounded-full flex items-center justify-center">
              <SendMoneyForm.ReceiverDetails.UserAdd />
            </div>
            Add different receiver..
          </Button>

          <ul className="space-y-2">
            <li className="rounded-[6px] border border-[#0000001A] p-4 flex justify-between">
              <div className="flex ">
                <SendMoneyForm.ReceiverDetails.User />
                <div>
                  <div>
                    <h5>Ranjit Kumar Shrestha</h5>
                    <h6>Rastriya Banijya Bank</h6>
                  </div>

                  <p>Acc no : 9912391xxxxxxxxx</p>
                </div>
              </div>
              <SendMoneyForm.ReceiverDetails.Check />
            </li>
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

export default SavedRecipients;
