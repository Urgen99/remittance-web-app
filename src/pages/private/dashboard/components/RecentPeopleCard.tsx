import { UserIcons } from "@/components/icons/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getColors } from "@/lib/generateRandomColors";
import moment from "moment";

const colorPalettes = ["#DEF5E7", "#EFF5DE", "#F5DEE8", "#DDE0F3"];
const RecentPeopleCard = ({ user }: any) => {
  const bgColor = getColors(user?.name, colorPalettes);
  console.log(bgColor);

  return (
    <div
      className="max-w-56 w-full px-11 py-4 flex justify-center items-center bg-[#DDE0F3] gap-4 rounded-[8px]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-[8.5rem] w-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-5 items-center">
          <div className="rounded-full bg-[#F5F8FF]">
            <Avatar className="!size-10">
              <AvatarImage src={user?.src} alt="user profile image" />
              <AvatarFallback>
                <UserIcons.Default />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-3 items-center">
            <h3 className="font-roboto font-normal text-base !leading-[24px] tracking[-1%] text-black">
              {user?.name}
            </h3>
            <p className="font-roboto text-sm leading-[18px] tracking-[-1%] font-normal text-[#696969]">
              Sent on {moment(user?.date).format("Do MMM")}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="text-[#3333C1] font-mukta font-medium text-sm p-2.5 w-full"
        >
          Send again
        </Button>
      </div>
    </div>
  );
};

export default RecentPeopleCard;
