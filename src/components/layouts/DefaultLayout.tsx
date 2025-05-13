import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Header from "../shared/Header/Header";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-7">
      <Header />
      <main className="flex-grow flex md:items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
