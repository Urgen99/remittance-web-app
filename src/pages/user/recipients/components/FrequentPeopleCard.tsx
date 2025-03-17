import { UserIcons } from "@/components/icons/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColors } from "@/lib/generateRandomColors";

const colorPalettes = [
  "#EAF1FA",
  "#F9FCF2",
  "#FCF4F2",
  "#F2F8FC",
  "#FCF2F2",
  "#E9ECF6",
];

const FrequentPeopleCard = ({ user }: any) => {
  const bgColor = getColors(user?.name, colorPalettes);

  return (
    <div
      className="max-w-[220px] min-h-52 w-full p-3 flex bg-[#DDE0F3] gap-4 rounded-[8px] bg-[url('/icons/contactPattern.svg')] bg-no-repeat bg-right-top"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col justify-between w-full">
        <div className="flex gap-5 justify-between">
          <div className="rounded-full bg-[#F5F8FF]">
            <Avatar className="!size-10">
              <AvatarImage src={user?.src} alt="user profile image" />
              <AvatarFallback>
                <UserIcons.Default />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="size-7 rounded-full bg-[#0A84FF] p-1 text-white">
            <p className="text-center font-roboto text-sm leading-[18px] font-normal tracking-[-1%]">
              {user?.count}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-roboto font-normal text-base !leading-[24px] tracking[-1%] text-black">
            {user?.name}
          </h3>
          <p className="font-roboto text-sm leading-[18px] tracking-[-1%] font-normal text-[#696969]">
            {user?.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequentPeopleCard;
