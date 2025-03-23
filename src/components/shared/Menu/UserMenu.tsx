import { DashboardHeaderIcons } from "@/components/icons/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getRandomColor,
  getUserInitials,
  userColorPalettes,
} from "@/lib/getColors";

const UserMenu = ({ user = {} }: { user: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <DashboardHeaderIcons.ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center gap-1.5">
          <Avatar className="!size-8">
            <AvatarImage src={user?.avatar} alt={user?.name + "- profile"} />
            <AvatarFallback
              className="uppercase text-white font-inter font-medium tracking-[-0.5px]"
              style={{
                backgroundColor: getRandomColor(user?.name, userColorPalettes)
                  .bg,
                color: getRandomColor(user?.name, userColorPalettes).text,
              }}
            >
              {getUserInitials(user?.name)}
            </AvatarFallback>
          </Avatar>

          <div className="px-1 flex flex-col gap-1">
            <h4 className="font-inter font-[475] text-sm tracking-[-0.05px] text-[#0a090b]">
              {user?.name}
            </h4>
            <p className="font-inter font-normal text-xs text-[#4F4D55]">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="px-4 py-2">
            <span className="text-[#4F4D55] uppercase font-inter font-[475] text-[10px] leading-[12px] tracking-[5%]">
              Account
            </span>
          </div>
          <DropdownMenuItem className="px-4 gap-1">
            <DashboardHeaderIcons.Logout />
            <span className="text-red-500 font-roboto font-normal text-sm tracking-[-1%]">
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
