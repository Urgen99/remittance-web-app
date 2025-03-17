import { DashboardIcons } from "../icons/Icons";

const IconTextContainer = ({ title }: { title: string }) => {
  return (
    <div className="border-l-[3px] border-[#3B1AB2] flex gap-2 items-center px-1">
      <h6 className="font-roboto font-normal text-base tracking-[-1%] text-[#1b1b1b]">
        {title}
      </h6>
      <DashboardIcons.Info />
    </div>
  );
};

export default IconTextContainer;
