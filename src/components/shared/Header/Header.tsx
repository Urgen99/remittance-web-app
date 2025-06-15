import { HelpCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#EBEBF9] p-3 lg:py-3 lg:px-6 z-10 sticky top-0 border-b shadow-md shadow-[#1018280D] lg:h-[4.5rem]">
      <nav>
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="/images/logo.svg"
              alt="swift send logo"
              className="w-28 h-[1.5rem] lg:w-32 lg:h-8 transition-all ease-in-out duration-300"
            />
          </Link>

          <Link
            to="#"
            className="transition-all ease-in-out duration-300 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 lg:px-4 lg:py-3 border border-[#C0C0EC] bg-white rounded-[8px] tracking-[-1%] font-roboto"
          >
            <HelpCircleIcon className="size-4 lg:size-5 transition-all ease-in-out duration-300" />
            <p className="text-sm sm:text-base">Get Help</p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
