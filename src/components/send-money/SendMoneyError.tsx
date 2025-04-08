import { SendMoneyStepper } from "../icons/Icons";
import { Button } from "../ui/button";

const SendMoneyError = () => {
  return (
    <section className="mt-7 max-w-[22.25rem] w-full">
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-[18px] items-center">
          <div className="flex flex-col gap-6 items-center">
            <div className="border border-[#FFCDD2] size-[3.37rem] bg-gradient-to-b from-[#FFF] to-[#FFE2E2] rounded-[12px] shadow-sm flex items-center justify-center">
              <SendMoneyStepper.SendError />
            </div>

            <div className="px-[9px] flex flex-col gap-3 items-center text-center">
              <h1 className="font-general-sans font-semibold text-2xl leading-[22px] tracking-[-1%] text-[#0A090B]">
                Hold up some error occurred !
              </h1>
              <p className="font-inter font-normal text-base leading-[22px] tracking-[-0.18px] text-[#696969]">
                Looks like some error occurred , it most likely is from our side
                , so don't worry the transactions will be on hold for now
              </p>
            </div>
          </div>

          <Button className="bg-[#3333C1] text-white rounded-[6px] h-11 max-w-[15.5rem] w-full font-inter font-[475] leading-[22px] tracking-[-0.18px] flex items-center justify-center">
            Continue
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SendMoneyError;
