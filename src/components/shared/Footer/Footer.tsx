import { Link, matchPath, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    !disableFooterPaths.some((link) => matchPath(link, pathname)) && (
      <footer className="flex justify-between items-end">
        <SlantedBlock />
        {!disableFooterTexts.some((link) => matchPath(link, pathname)) && (
          <div className="w-full flex items-center justify-center">
            <p className="transition-all ease-in-out duration-300 max-w-[20rem] sm:max-w-[30rem] md:max-w-[35rem] lg:max-w-[40rem] w-full text-center font-inter tracking-[-2%] text-xs sm:text-sm">
              By signing up with us, you acknowledge and agree to abide by our{" "}
              <Link
                to="/terms-and-conditions"
                className="text-[#3333C1] underline"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/terms-and-conditions"
                className="text-[#3333C1] underline"
              >
                Privacy Policy{" "}
              </Link>
              , which outline the rules, regulations, and data protection
              practices governing our services
            </p>
          </div>
        )}
        <SlantedBlock reversed />
      </footer>
    )
  );
};

export default Footer;

const disableFooterPaths = ["/dashboard"];
const disableFooterTexts = [
  "/upload-documents",
  "/select-documents",
  "/send-money",
  "/dashboard",
];

const SlantedBlock = ({ reversed = false }: { reversed?: boolean }) => (
  <div
    className={`transition-all ease-in-out duration-300 w-0 h-0 sm:border-r-[10rem] sm:border-b-[7.5rem] md:border-r-[15rem] md:border-b-[9.5rem] lg:border-r-[20rem] xl:border-r-[27.5rem] xl:border-b-[10.3rem] border-b-[#2E2EA0] border-white ${
      reversed && "scale-x-[-1]"
    }`}
  />
);
