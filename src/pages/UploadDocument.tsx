import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/lib/type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadDocument = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const handleSelect = (documentType: string) => {
    setSelected(documentType);
  };

  const handleNavigate = () => {
    navigate("/select-documents");
  };

  return (
    <main className="mt-7">
      <section className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[40.35rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM CONTAINER ---------- */}

        <div className="max-w-[50rem] w-full flex flex-col items-center gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {documents &&
              documents.map(({ Icon, title, subtitle, documentType }) => (
                <div
                  key={title}
                  className={`cursor-pointer p-4 bg-[url('/images/upload.png')] lg:max-w-[16rem] w-full h-[10.5rem] bg-no-repeat bg-top rounded-[8px] border border-[#00000008] hover:border-[#3333C1] hover:bg-[#EBEBF9] flex justify-end relative ${
                    selected === documentType && "border-[#3333C1] bg-[#EBEBF9]"
                  }`}
                  onClick={() => handleSelect(documentType)}
                >
                  {selected === documentType && (
                    <div className="absolute">
                      <FormIcons.CheckIcon />
                    </div>
                  )}

                  <div className="h-full flex flex-col justify-between">
                    <div className="w-fit p-2 flex justify-center items-center bg-[#EBEBF9] rounded-full">
                      <Icon />
                    </div>

                    <div className="select-none flex flex-col gap-3">
                      <h4 className="font-general-sans font-medium text-base leading-[20.8px] tracking-[-1%] text-[#1b1b1b]">
                        {title}
                      </h4>
                      <p className="font-roboto text-sm tracking-[-1%] text-[#696969] leading-[18px]">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <Button
            onClick={handleNavigate}
            disabled={selected === ""}
            className="w-full max-w-[15.5rem] cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] disabled:bg-[#696969] disabled:opacity-100"
          >
            Continue
          </Button>
        </div>
      </section>
    </main>
  );
};

export default UploadDocument;

const formDescription: FormDescription = {
  Icon: FormIcons.Folder,
  title: "Select a document",
  subtitle:
    "To comply with Australian government regulations and verify your status, you are required to submit an approved form of identification. Please select one from the options below.",
};

const documents = [
  {
    Icon: FormIcons.Passport,
    title: "Passport Verification",
    subtitle: "Upload your passport image for quick identity verification.",
    documentType: "passport",
  },
  {
    Icon: FormIcons.License,
    title: "Drivers license verification",
    subtitle: "Upload your drivers license for quick identity verification.",
    documentType: "license",
  },
  {
    Icon: FormIcons.Passport,
    title: "National ID verification",
    subtitle: "Upload your national ID for quick identity verification.",
    documentType: "nationalId",
  },
];
