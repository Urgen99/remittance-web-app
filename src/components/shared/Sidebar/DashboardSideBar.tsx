import { DashboardIcons } from "@/components/icons/Icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SettingsDialog from "@/components/user-settings/settings-dialog/SettingsDialog";
import { Link, useLocation } from "react-router-dom";

const DashboardSideBar = () => {
  const { pathname } = useLocation();

  const getBasePath = (path: string) => {
    const pathWithoutQuery = path.split(/[?#]/)[0];

    // remove slashes
    return pathWithoutQuery.replace(/\/+$/, "") || "/";
  };

  const isActiveLink = (currentPath: string, targetUrl: string) => {
    const baseCurrent = getBasePath(currentPath);
    const baseTarget = getBasePath(targetUrl);

    if (baseTarget === "/") {
      return baseCurrent === "/";
    }

    return (
      baseCurrent === baseTarget || baseCurrent.startsWith(`${baseTarget}/`)
    );
  };

  return (
    <Sidebar
      aria-label="Sidebar"
      className="border-r border-white w-full max-w-[19.25rem]"
    >
      <SidebarHeader
        aria-label="Sidebar header"
        aria-orientation="vertical"
        className="border-b border-white h-14 px-6 py-2 justify-center"
      >
        <Link to="/">
          <img
            src="/images/logo.svg"
            alt="swift send logo"
            className="w-32 h-8 transition-all ease-in-out duration-300"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-5 w-full justify-between px-6 pt-6">
        <div className="flex w-full flex-col gap-3 items-center">
          <Link
            to="/send-money"
            className="px-4 py-2 w-full rounded-[6px] bg-[#3333C1] text-center text-white font-inter font-[475] text-sm tracking-[-0.05px] h-9"
          >
            Send Money
          </Link>
          <SidebarGroup className="w-full p-0">
            <SidebarGroupLabel className="uppercase text-[#4F4D55] font-inter font-[475] text-[10px] leading-[12px] tracking-[5%] select-none ">
              primary operations
            </SidebarGroupLabel>
            <SidebarGroupContent className="flex items-center">
              <SidebarMenu>
                {items.map(({ title, url, Icon }) => {
                  const active = isActiveLink(pathname, url);

                  return (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton
                        asChild
                        className={`h-10 font-inter font-[475] text-sm tracking-[-0.05px] px-1.5 py-2 hover:bg-white rounded-[8px] ${
                          active ? "bg-white text-[#3333C1]" : "text-[#696969]"
                        }`}
                      >
                        <Link to={url} className={`flex items-center gap-2 `}>
                          <Icon fill={`${active ? "#3333C1" : "#696969"}`} />
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <SidebarGroup key="Settings Group">
          <SidebarGroupLabel className="uppercase font-inter font-[475] text-[10px] leading-3 tracking-[5%] text-[#4F4D55] select-none">
            settings and profile
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex items-center">
            <SidebarMenu>
              <SidebarMenuItem key="profile">
                <SettingsDialog aria-describedby="user settings dialog" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSideBar;

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    Icon: DashboardIcons.Home,
  },
  {
    title: "Transaction History",
    url: "/transactions",
    Icon: DashboardIcons.TransactionHistory,
  },
  {
    title: "Recipients",
    url: "/recipients",
    Icon: DashboardIcons.Recipients,
  },
];
