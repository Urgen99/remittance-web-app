import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/lib/constant";
import NotificationMenu from "../Menu/NotificationMenu";
import UserMenu from "../Menu/UserMenu";
const DashboardHeader = () => {
  return (
    <div className="h-14 px-6 py-2 bg-[#EBEBF9] flex items-center justify-end">
      <div className="flex items-center gap-3">
        <div>
          <NotificationMenu notifications={user?.notifications} />
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="!size-10">
            <AvatarImage src={user?.avatar} alt={user?.name + "- profile"} />
            <AvatarFallback className="uppercase bg-[#2080F6] text-white font-inter font-medium tracking-[-0.5px]">
              {user?.name.split(" ")[0][0] + user?.name.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          <h6>My Account</h6>
        </div>
        <div>
          <UserMenu user={user} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
