import { FormDescription } from "@/lib/type";

const FormHeadingDescription = ({
  formDescription,
}: {
  formDescription: FormDescription;
}) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 items-center transition-all ease-in-out duration-300">
      <div
        className={`border border-[#E2E2FF] bg-gradient-to-br from-[#FFFF] to-[#E2E2FF] size-10 sm:size-[3.37rem] rounded-[12px] shadow-sm shadow-[#07073A0D] flex items-center justify-center ${formDescription.iconContainerClassName}`}
      >
        <formDescription.Icon />
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 transition-all ease-in-out duration-300">
        <h1 className="text-center font-semibold font-general-sans text-xl sm:text-2xl tracking-[-1%] text-[#0A090B] transition-all ease-in-out duration-300">
          {formDescription.title}
        </h1>
        <h3 className="text-center font-inter tracking-[-0.18px] text-sm sm:text-base text-[#696969] transition-all ease-in-out duration-300w">
          {formDescription.subtitle}
        </h3>
      </div>
    </div>
  );
};

export default FormHeadingDescription;
