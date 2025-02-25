import { FormDescription } from "@/lib/type";

const FormHeadingDescription = ({
  formDescription,
}: {
  formDescription: FormDescription;
}) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="border border-[#E2E2FF] bg-gradient-to-br from-[#FFFF] to-[#E2E2FF] size-[3.37rem] rounded-[12px] shadow-sm shadow-[#07073A0D] flex items-center justify-center">
        <formDescription.Icon />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-center font-semibold font-general-sans text-2xl tracking-[-1%] text-[#0A090B]">
          {formDescription.title}
        </h1>
        <h3 className="text-center font-inter tracking-[-0.18px] text-base text-[#696969]">
          {formDescription.subtitle}
        </h3>
      </div>
    </div>
  );
};

export default FormHeadingDescription;
