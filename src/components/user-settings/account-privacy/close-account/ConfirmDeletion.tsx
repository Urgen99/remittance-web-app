import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import TextContainer from "../TextContainer";

const ConfirmDeletion = ({
  handlePrev,
}: {
  handlePrev: (args: string) => void;
}) => {
  return (
    <div className="h-full pb-6 pt-4 pr-7 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <TextContainer
          handlePrev={() => handlePrev("enter-otp")}
          link="account-privacy"
          title="Account deletion request sent"
          subtitle="We've received your account deletion request. Please review your email for additional request"
        />
      </div>

      <div className="flex flex-col gap-5 pl-1">
        <div className="border border-[#FF0A1E] bg-[#FFCDD2] flex items-start gap-3 rounded-[4px] px-3 py-4">
          <p className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#1b1b1b]">
            Please note that you can recover your account if you log in within 7
            days. After this period, all data will be permanently lost.
          </p>
        </div>

        <Button className="font-mukta font-medium leading-7 w-fit h-10 rounded-[4px] bg-[#3333c1] hover:bg-[#3333c1] !px-5 !py-3">
          Continue <DialogSettingsIcons.ChevronRight fill="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDeletion;
