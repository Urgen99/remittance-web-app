import PeopleCard from "@/components/shared/Generic/PeopleCard";
import IconTextContainer from "@/components/shared/IconTextContainer";
import { Link } from "react-router-dom";

const colorPalettes = ["#DEF5E7", "#EFF5DE", "#F5DEE8", "#DDE0F3"];
const RecentPeopleContainer = ({ user }: any) => {
  return (
    <div className="border border-[#0000001A] rounded-[8px] max-w-[30.68rem] 2xl:max-w-full w-full flex flex-col pb-6">
      <div className="p-4 flex justify-between items-center">
        <IconTextContainer title="Recent peoples" />

        <Link
          to="/recipients"
          className="font-inter font-[475] text-[#3333C1] !text-sm leading-[20px] tracking-[-0.05px]"
        >
          View all people
        </Link>
      </div>

      <div className="pr-3 pl-3.5 flex items-center">
        <div className="flex flex-wrap gap-x-[11px] gap-y-[15px]">
          {user.recentPeoples.slice(0, 4).map((user: any) => (
            // <RecentPeopleCard key={user.id} user={user} />

            <PeopleCard
              variant="recent"
              user={user}
              colorPalettes={colorPalettes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPeopleContainer;
