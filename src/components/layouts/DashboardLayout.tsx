import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/Header/DashboardHeader";
import DashboardSideBar from "../shared/Sidebar/DashboardSideBar";
import { TriangleAlert } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div>
      <main>
        <div className="flex">
          <section className="max-w-[19.25rem] w-full bg-[#EBEBF9]">
            <DashboardSideBar />
          </section>
          <section className="flex-grow">
            <div className="flex justify-center sticky top-0 items-center gap-2 bg-red-100 px-3 py-1 rounded-md text-red-600 text-sm">
              <TriangleAlert />
              <span>Development Preview - Test Data Only</span>
            </div>
            <DashboardHeader />

            <section className="p-6">
              <Outlet />
            </section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
