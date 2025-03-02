import { Outlet } from "react-router-dom";
import DashboardSideBar from "../shared/Sidebar/DashboardSideBar";

const DashboardLayout = () => {
  return (
    <div>
      <main>
        <div className="min-h-screen flex gap-4">
          <div className="border-red-500 border-2">
            <DashboardSideBar />
          </div>
          <div className="border-black p-4 border-2 flex-grow">
            <div className="p-4 border-red-500 border-2">Header</div>
            <div className="border-blue-500 border-2">
              <Outlet />
              {/* Dashboard Content */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
