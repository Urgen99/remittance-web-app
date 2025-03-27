import { Terms, terms } from "@/lib/constant";

const PrivacyPolicy = () => {
  return (
    <div className="h-full pt-4 pb-7 pr-12 transition-all ease-in-out duration-300">
      <div className="flex flex-col gap-5">
        <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
          Privacy Policy
        </h3>

        <div className="max-h-[33rem] box-border rounded-[12px] border border-[#E0E0E0] p-6 overflow-scroll shadow-xs">
          <ol className="flex flex-col gap-6">
            {terms.map(
              (
                { title, content, subContent, conclusion }: Terms,
                index: number
              ) => (
                <li key={Math.random()} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-5">
                    <h3 className="font-general-sans font-medium text-lg leading-5 tracking-[-2%] text-[#1b1b1b]">
                      {index + 1}. {title}
                    </h3>
                    <p className="font-roboto font-normal text-base leading-6 tracking-[-1%] text-[#696969]">
                      {content}
                    </p>

                    {subContent && (
                      <ul className="ml-1 list-disc list-inside">
                        {subContent.map(({ title, content }) => (
                          <li className="font-roboto font-normal text-base leading-6 tracking-[-1%]">
                            <span className="text-[#1B1B1B]">{title}:</span>{" "}
                            <span className="text-[#696969]">{content}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {conclusion && (
                      <p className="font-roboto font-normal text-base leading-6 tracking-[-1%] text-[#696969]">
                        {conclusion}
                      </p>
                    )}
                  </div>

                  {terms.length - 1 !== index && (
                    <div className="border border-[#E0E0E0]" />
                  )}
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
