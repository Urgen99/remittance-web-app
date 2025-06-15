import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { FormDescription } from "@/lib/type";
import { Link } from "react-router-dom";

const formDescription: FormDescription = {
  Icon: () => (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6 sm:size-[33px]"
    >
      <path
        d="M7.47656 29.3906V19.0781M7.47656 19.0781V6.1875M7.47656 19.0781L10.6614 18.4412C12.789 18.0157 14.9945 18.2181 17.0091 19.024C19.1922 19.8972 21.5949 20.0603 23.876 19.49L24.1524 19.4209C24.9582 19.2194 25.5234 18.4955 25.5234 17.6649V8.16839C25.5234 7.1622 24.5779 6.4239 23.6017 6.66793C21.499 7.19363 19.284 7.0433 17.2716 6.23833L17.0091 6.13332C14.9945 5.32749 12.789 5.125 10.6614 5.55054L7.47656 6.1875M7.47656 6.1875V3.60938"
        stroke="#D32F2F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  title: "Your documentations have expired",
  subtitle:
    " Your documents have expired. Please re-upload a valid document to continue using the app.",
  iconContainerClassName:
    "border-[#FFCDD2] bg-gradient-to-b from-[#FFF] to-[#FFE2E2]",
};

const DocumentExpired = () => {
  return (
    <section className="mt-7 px-5">
      <div className="flex items-center justify-center">
        <div className="flex max-w-[31.375rem] w-full flex-col gap-[18px] items-center">
          <div className="max-w-fit w-full">
            <FormHeadingDescription formDescription={formDescription} />
          </div>

          <Link
            to="/upload-documents"
            className="bg-[#3333C1] text-white rounded-[6px] h-11 w-full font-inter font-[475] leading-[22px] tracking-[-0.18px] flex items-center justify-center text-xs sm:text-sm"
          >
            Re-upload documents
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DocumentExpired;
