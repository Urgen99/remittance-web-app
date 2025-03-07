import { FormIcons } from "@/components/icons/Icons";

import { FormDescription } from "@/lib/type";
import FormHeadingDescription from "../components/shared/FormHeadingDescription";
import FileUpload from "@/components/shared/FileUpload";

const SelectDocument = () => {
  return (
    <main className="mt-7">
      <section className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[40.75rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}
          <FormHeadingDescription formDescription={formDescription} />
        </div>

        {/* ---------- FORM SELECT ---------- */}
        <div className="max-w-[36.55rem] w-full flex justify-center flex-col gap-4">
          <FileUpload />
        </div>
      </section>
    </main>
  );
};

export default SelectDocument;

const formDescription: FormDescription = {
  Icon: FormIcons.Folder,
  title: "Upload front side of document",
  subtitle:
    "To comply with Australian government regulations and verify your status, you are required to submit an approved form of identification. Please select one from the options below.",
};
