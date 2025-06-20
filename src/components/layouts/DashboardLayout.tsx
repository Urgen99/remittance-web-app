import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/Header/DashboardHeader";
import DashboardSideBar from "../shared/Sidebar/DashboardSideBar";
import { SidebarProvider } from "../ui/sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="max-w-[19.25rem] w-full bg-[#EBEBF9] overflow-hidden">
        <DashboardSideBar />
      </div>

      <main className="w-full">
        <DashboardHeader />

        <div className="bg-white p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
