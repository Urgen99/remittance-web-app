import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/Header/DashboardHeader";
import DashboardSideBar from "../shared/Sidebar/DashboardSideBar";

const DashboardLayout = () => {
  return (
    <div>
      <main>
        <div className="flex">
          <section className="max-w-[19.25rem] w-full bg-[#EBEBF9]">
            <DashboardSideBar />
          </section>
          <section className="flex-grow">
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
