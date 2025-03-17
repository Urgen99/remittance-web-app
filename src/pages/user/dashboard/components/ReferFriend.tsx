import { Button } from "@/components/ui/button";

const ReferFriend = () => {
  return (
    <>
      <div className="max-w-[42rem] w-full bg-gradient-to-l from-[#7676d5] to-[#10108D] rounded-[8px]">
        <div className="p-4 bg-[url('/images/dashboard-bg.svg')] bg-contain bg-right bg-no-repeat flex justify-between items-center rounded-[8px]">
          <div className="max-w-[306px] w-full flex flex-col gap-5">
            <div className="text-white flex flex-col gap-4">
              <h3 className="max-w-[289px] font-general-sans text-xl font-medium tracking-[-2%]">
                Earn $25 When You Refer a Friend! 🎉
              </h3>
              <p className="font-roboto font-normal text-sm tracking-[-1%]">
                When your friend signs up and completes their first transaction,
                you'll receive a $25 bonus
              </p>
            </div>
            <div>
              <Button className="bg-white text-[#3333C1] font-roboto font-normal text-sm tracking-[-1%] hover:bg-white">
                Refer now
              </Button>
            </div>
          </div>

          <div className="max-w-[255px] w-full">
            <img src="/images/locker.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferFriend;
