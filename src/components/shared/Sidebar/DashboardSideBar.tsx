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
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
const DashboardSideBar = () => {
  return (
    <section>
      <div className="flex flex-col gap-[1px]">
        <SidebarProvider open>
          <Sidebar className="max-w-[19.25rem] w-full">
            <SidebarHeader className="bg-[#EBEBF9] mb-[1px] px-[22px] py-[13px]">
              <div>
                <Link to="/">
                  <img
                    src="/images/logo.svg"
                    alt="swift send logo"
                    className="w-32 h-8 transition-all ease-in-out duration-300"
                  />
                </Link>
              </div>
            </SidebarHeader>
            <SidebarContent className="bg-[#EBEBF9] p-6">
              <SidebarGroup>
                <SidebarContent className="mb-3">
                  <Link
                    to="#"
                    className="px-4 py-2 w-full rounded-[6px] bg-[#3333C1] text-center text-white font-inter font-[475] text-sm tracking-[-0.05px]"
                  >
                    Send Money
                  </Link>
                </SidebarContent>
                <SidebarGroupLabel className="uppercase font-inter font-[475] text-[10px] leading-[12px] tracking-[5%] ">
                  Primary Operations
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className="hover:!bg-white">
                          <Link
                            className={`font-inter font-[475] text-sm tracking-[-0.05px] text-[#696969]`}
                            to={item.url}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
    </section>
  );
};

export default DashboardSideBar;

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: DashboardIcons.Home,
  },
  {
    title: "Transaction History",
    url: "/transactions",
    icon: DashboardIcons.TransactionHistory,
  },
  {
    title: "Recipients",
    url: "/recipients",
    icon: DashboardIcons.Recipients,
  },
];
