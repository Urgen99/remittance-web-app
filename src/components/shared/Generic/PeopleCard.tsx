import { UserIcons } from "@/components/icons/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getColors } from "@/lib/generateRandomColors";
import { format } from "date-fns";
type UserBase = {
  id: string;
  name: string;
  src?: string;
};

type PeopleCardProps = (
  | {
      variant: "recent";
      user: UserBase & { date: Date };
    }
  | {
      variant: "frequent";
      user: UserBase & { contact: string; count: number };
      patternUrl?: string;
    }
) & {
  colorPalettes: string[];
};

const PeopleCard = (props: PeopleCardProps) => {
  const { variant, user, colorPalettes } = props;
  const bgColor = getColors(user.name, colorPalettes);

  return (
    <div
      className={`max-w-56 w-full p-3 flex gap-4 rounded-[8px] bg-no-repeat bg-right-top ${
        variant === "recent"
          ? "px-11 py-4 justify-center items-center"
          : "min-h-52"
      }`}
      style={{
        backgroundColor: bgColor,
        ...(variant === "frequent" && {
          backgroundImage: `url('${props.patternUrl}')`,
        }),
      }}
    >
      <div
        className={`flex flex-col ${
          variant === "recent"
            ? "items-center gap-4 max-w-[8.5rem]"
            : "justify-between w-full"
        }`}
      >
        <div
          className={`flex ${
            variant === "recent"
              ? "flex-col gap-5 items-center"
              : "gap-5 justify-between"
          }`}
        >
          <div className="rounded-full bg-[#F5F8FF]">
            <Avatar className="!size-10">
              <AvatarImage src={user.src} alt={`${user.name}'s profile`} />
              <AvatarFallback>
                <UserIcons.Default />
              </AvatarFallback>
            </Avatar>
          </div>

          {variant === "frequent" && (
            <div className="size-7 rounded-full bg-[#0A84FF] p-1 text-white">
              <p className="text-center font-roboto text-sm leading-[18px] font-normal tracking-[-1%]">
                {user.count}
              </p>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col gap-3 ${
            variant === "recent" ? "items-center text-center" : ""
          }`}
        >
          <h3 className="font-roboto font-normal text-base !leading-[24px] tracking-[-1%] text-black">
            {user.name}
          </h3>

          <p className="font-roboto text-sm leading-[18px] tracking-[-1%] font-normal text-[#696969]">
            {variant === "recent"
              ? `Sent on ${format(user.date, "do MMM")}`
              : user.contact}
          </p>
        </div>

        {variant === "recent" && (
          <Button
            variant="outline"
            className="text-[#3333C1] font-mukta font-medium text-sm p-2.5 w-full"
          >
            Send again
          </Button>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
