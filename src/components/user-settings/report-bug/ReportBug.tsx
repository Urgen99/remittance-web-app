import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ReportBug = () => {
  return (
    <div className="h-full pt-4 pr-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
            Report a bug
          </h3>
          <div>
            <p className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#696969]">
              You can report any bugs you've encountered while using the
              application through email,
            </p>{" "}
            <p className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#696969]">
              can either copy the Gmail
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-[24.75rem] w-full">
          <div className="flex flex-col gap-1">
            <p className="font-inter font-[475] text-sm leading-5 tracking-[0.05px] text-[#2D2B32]">
              Our email address
            </p>

            <div className="pl-3 pr-2 h-10 rounded-[8px] flex justify-between items-center border border-[#E6E6E6] shadow-sm">
              <p className="text-[#7F7D83]">Support@swiftsend@gmail.com</p>

              <Button
                size="icon"
                variant="ghost"
                className="size-fit hover:bg-transparent cursor-pointer"
                title="Copy"
              >
                <DialogSettingsIcons.Copy />
              </Button>
            </div>
          </div>

          <p className="font-roboto font-normal text-base leading-6 tracking-[-1%] text-[#1b1b1b]">
            Click here to go to{" "}
            <Link to="/contact" className="underline text-[#3333C1]">
              contact page
            </Link>{" "}
            for further help
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportBug;
