import { DashboardHeaderIcons, FormIcons } from "@/components/icons/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const NotificationMenu = ({ notifications = [] }: { notifications?: any }) => {
  //   const isRead = notifications?.some(
  //     (notification: any) => !notification.isRead
  //   );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <DashboardHeaderIcons.Notification
          // fill={isRead ? "#D32F2F" : "#262628"}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel className="text-[#4F4D55] uppercase font-inter font-medium text-[10px] leading-[12px] tracking-[5%] flex justify-between items-center">
          Notifications
          <DashboardHeaderIcons.Notification
            fill="#696969"
            className="border rounded-full p-1 border-[#696969]"
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications &&
            notifications.map(({ title, isRead, createdAt }: any) => (
              <DropdownMenuItem
                key={title}
                className={`gap-1 py-3 ${!isRead && "bg-[#EBEBF9]"}`}
              >
                <FormIcons.InfoFilled className="size-7" />
                <div
                  className={`font-inter ${
                    isRead ? "font-light" : "font-[475]"
                  }`}
                >
                  <h6 className="text-sm tracking-[-1%]">{title}</h6>
                  <span className="text-xs tracking-[-1%] text-[#696969]">
                    {new Date(createdAt).toDateString()}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
