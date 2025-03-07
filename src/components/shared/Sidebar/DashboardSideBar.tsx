import { DashboardIcons } from "@/components/icons/Icons";
import { Link, useLocation } from "react-router-dom";

const DashboardSideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-[1px] w-full h-full">
      {/* ---------- LOGO ---------- */}
      <div className="w-full border-r border-white border-b h-14 px-[22px] py-[13px]">
        <Link to="/">
          <img
            src="/images/logo.svg"
            alt="swift send logo"
            className="w-32 h-8 transition-all ease-in-out duration-300"
          />
        </Link>
      </div>

      {/* ---------- DASHBOARD CONTENT ---------- */}
      <div className="p-6 h-full border-r border-white">
        <div className="flex flex-col justify-between items-center h-full">
          <div className="w-full flex flex-col gap-3">
            <Link
              to="/send-money"
              className="px-4 py-2 w-full rounded-[6px] bg-[#3333C1] text-center text-white font-inter font-[475] text-sm tracking-[-0.05px]"
            >
              Send Money
            </Link>

            <div className="flex flex-col gap-1.5">
              <span className="text-[#4F4D55] uppercase font-inter font-[475] text-[10px] leading-[12px] tracking-[5%]">
                Primary Operations
              </span>
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-2 font-inter font-[475] text-sm tracking-[-0.05px] px-1.5 py-2 hover:bg-white rounded-[8px] ${
                      pathname === item.url
                        ? "bg-white text-[#3333C1]"
                        : "text-[#696969]"
                    }`}
                  >
                    <item.icon
                      fill={`${pathname === item.url ? "#3333C1" : "#696969"}`}
                    />
                    <span
                      className={`${pathname === item.url && "text-[#3333C1]"}`}
                    >
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <span className="text-[#4F4D55] uppercase font-inter px-3 font-[475] text-[10px] leading-[12px] tracking-[5%]">
              Settings and Profile
            </span>

            <div className="px-1.5 py-2 hover:bg-white rounded-[8px]">
              <Link
                className={`flex items-center gap-2 font-inter font-[475] text-sm tracking-[-0.05px] text-[#696969]`}
                to="/settings"
              >
                <DashboardIcons.Settings />
                <span>Setting and profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
