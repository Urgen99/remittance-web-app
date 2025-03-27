import InitialSettings from "./InitialSettings";

const AccountPrivacy = () => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-5">
        <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
          Account and Privacy
        </h3>

        <InitialSettings />
      </div>
    </div>
  );
};

export default AccountPrivacy;
