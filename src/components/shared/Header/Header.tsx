import { HelpCircleIcon } from "lucide-react";
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
              className="w-32 h-8 transition-all ease-in-out duration-300"
            />
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 px-4 py-3 border border-[#C0C0EC] bg-white rounded-[8px] tracking-[-1%] font-roboto"
          >
            <HelpCircleIcon />
            Get Help
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
