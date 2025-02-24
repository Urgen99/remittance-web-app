import { Link, matchPath, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    !disableFooterPaths.some((link) => matchPath(link, pathname)) && (
      <footer>
        <div className="flex justify-between items-end">
          <SlantedBlock />
          {!disableFooterTexts.some((link) => matchPath(link, pathname)) && (
            <div className="pb-[22px]">
              <p className="xl:max-w-[40rem] w-full text-center font-inter tracking-[-2%] text-sm">
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
        </div>
      </footer>
    )
  );
};

export default Footer;

const disableFooterPaths = ["/upload-documents", "/send-money"];
const disableFooterTexts = ["/upload-documents", "/send-money"];

const SlantedBlock = ({ reversed = false }: { reversed?: boolean }) => (
  <div
    className={`w-0 h-0 bg-blue-500 border-r-[27.5rem] border-b-[10.3rem] border-b-[#2E2EA0] border-white ${
      reversed && "scale-x-[-1]"
    }`}
  />
);
