import { HelpCircleIcon, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#EBEBF9] py-3 px-6 z-10 sticky top-0 border-b shadow-md shadow-[#1018280D] lg:h-[4.5rem]">
      <nav>
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="/images/logo.svg"
              alt="swift send logo"
              className="w-28 h-[1.5rem] sm:w-32 sm:h-8 transition-all ease-in-out duration-300"
            />
          </Link>

          <div className="flex flex-col items-center gap-2 bg-red-100 sm:px-3 py-1 rounded-md text-red-600 ">
            <TriangleAlert />
            <span className="text-sm sm:text-sm">
              Development Preview - Test Data Only
            </span>
          </div>

          <Link
            to="#"
            className="transition-all ease-in-out duration-300 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-3 border border-[#C0C0EC] bg-white rounded-[8px] tracking-[-1%] font-roboto"
          >
            <HelpCircleIcon className="size-4 sm:size-5 transition-all ease-in-out duration-300" />
            <p className="text-sm sm:text-base">Get Help</p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
