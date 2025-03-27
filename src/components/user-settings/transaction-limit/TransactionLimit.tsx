import { DialogSettingsIcons } from "@/components/icons/Icons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const cardContent: CardContent[] = [
  {
    Icon: DialogSettingsIcons.SunnyDay,
    title: "You have a daily limit of AUD 24000",
    content: "This refreshes in 24 hours from now",
  },
  {
    Icon: DialogSettingsIcons.CalendarMonth,
    title: "You have a monthly limit of AUD 24000",
    content: "This refreshes in 24 days from now",
  },
];

type CardContent = {
  Icon: React.FC;
  title: string;
  content: string;
};

const TransactionLimit = () => {
  return (
    <div className="h-full pt-4 pr-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
            Money sending limit
          </h3>
          <p className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#696969]">
            The maximum amount of money you can send at once is{" "}
            <span className="text-[#1b1b1b]">AUD 25000</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {cardContent.map(({ Icon, title, content }) => (
            <Card
              key={title}
              className="w-full p-3 bg-[#F6F6F6] border border-[#0000001A] shadow-none"
            >
              <div className="flex items-center justify-center rounded-full size-[36px] bg-[#EBEBF9]">
                <Icon />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="max-w-[12.75rem] w-full font-general-sans font-medium text-base leading-5 text-black">
                  {title}
                </CardTitle>
                <CardDescription className="font-roboto text-sm leading-[18px] text-[#696969] font-normal tracking-[-1%]">
                  {content}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionLimit;
