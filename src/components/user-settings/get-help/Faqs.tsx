import { DialogSettingsIcons } from "@/components/icons/Icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useGetAllFaqsQuery } from "@/features/faqs/faqApi.slice";

const Faqs = ({ handlePrev }: { handlePrev: () => void }) => {
  const { data, isLoading, isFetching } = useGetAllFaqsQuery();
  const faqs = data?.data;

  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 max-w-[21.87rem] w-full">
          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-transparent size-fit cursor-pointer"
              onClick={handlePrev}
            >
              <DialogSettingsIcons.ChevronLeft />
            </Button>
            <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
              Frequently asked questions
            </h3>
          </div>

          <div className="bg-[#EBEBF9] px-3 py-4 rounded-[4px] border-[#5900FF59] border flex items-center gap-3">
            <DialogSettingsIcons.Pointer />

            <p className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#3333C1]">
              Click on any of these card to view the answers
            </p>
          </div>
        </div>

        <div className="rounded-[4px] py-0.5 px-2 border-[#0000000A] border shadow-xs">
          {isLoading && isFetching ? (
            <p>Loading</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs &&
                faqs.map(({ question, answer, id }) => (
                  <AccordionItem value={String(id)} key={id}>
                    <AccordionTrigger>
                      <h6 className="font-roboto font-normal text-base leading-6 tracking-[-1%] text-black">
                        {question}
                      </h6>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm font-roboto text-[#696969] tracking-[-1%] leading-[18px]">
                        {answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
