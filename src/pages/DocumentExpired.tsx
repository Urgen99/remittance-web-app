import { Link } from "react-router-dom";

const DocumentExpired = () => {
  return (
    <section className="mt-7">
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-[18px] items-center">
          <div className="flex flex-col gap-6 items-center">
            <div className="border border-[#FFCDD2] size-[3.37rem] bg-gradient-to-b from-[#FFF] to-[#FFE2E2] rounded-[12px] shadow-sm flex items-center justify-center">
              <DocumentUploadIcon />
            </div>

            <div className="px-[9px] flex flex-col gap-3 items-center text-center">
              <h1 className="font-general-sans font-semibold text-2xl leading-[22px] tracking-[-1%] text-[#0A090B]">
                Your documentations have expired
              </h1>
              <p className="font-inter font-normal text-base leading-[22px] tracking-[-0.18px] text-[#696969]">
                Your documents have expired. Please re-upload a valid <br />
                document to continue using the app.
              </p>
            </div>
          </div>

          <Link
            to="/upload-documents"
            className="bg-[#3333C1] text-white rounded-[6px] h-11 w-full font-inter font-[475] leading-[22px] tracking-[-0.18px] flex items-center justify-center"
          >
            Re-upload documents
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DocumentExpired;

const DocumentUploadIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.47656 29.3906V19.0781M7.47656 19.0781V6.1875M7.47656 19.0781L10.6614 18.4412C12.789 18.0157 14.9945 18.2181 17.0091 19.024C19.1922 19.8972 21.5949 20.0603 23.876 19.49L24.1524 19.4209C24.9582 19.2194 25.5234 18.4955 25.5234 17.6649V8.16839C25.5234 7.1622 24.5779 6.4239 23.6017 6.66793C21.499 7.19363 19.284 7.0433 17.2716 6.23833L17.0091 6.13332C14.9945 5.32749 12.789 5.125 10.6614 5.55054L7.47656 6.1875M7.47656 6.1875V3.60938"
      stroke="#D32F2F"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
