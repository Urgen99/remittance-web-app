import {
  ListItemBody,
  ListItemCard,
  ListItemFooter,
  ListItemHeader,
} from "@/components/shared/Generic/ListItemCard";
import PeopleCard from "@/components/shared/Generic/PeopleCard";
import IconTextContainer from "@/components/shared/IconTextContainer";
import TextContainer from "@/components/shared/TextContainer";
import { user } from "@/lib/constant";
import { InfoIcon } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";

const colorPalettes = [
  "#EAF1FA",
  "#F9FCF2",
  "#FCF4F2",
  "#F2F8FC",
  "#FCF2F2",
  "#E9ECF6",
];
const Recipients = () => {
  return (
    <div className="min-h-screen flex flex-col gap-6">
      <TextContainer title="Recipients" />

      <div className="flex flex-col gap-4">
        <IconTextContainer title="Frequent sending people" />

        <div className="flex gap-3 items-center">
          <Carousel className="w-full relative">
            <CarouselContent className="gap-3 ml-1">
              {user.recentPeoples.map((user: any) => (
                <CarouselItem key={user.id} className="basis-56 p-0">
                  <PeopleCard
                    variant="frequent"
                    user={user}
                    colorPalettes={colorPalettes}
                    patternUrl="/icons/contactPattern.svg"
                  />
                </CarouselItem>
                // <FrequentPeopleCard key={user.id} user={user} />
              ))}
            </CarouselContent>
            <CarouselNext className="absolute -right-3" />
          </Carousel>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5 border border-[#0000001A] rounded-[8px]">
        <IconTextContainer title="All saved recipients" />

        <div className="flex flex-col gap-1">
          {user?.recentPeoples.map(({ id, name, avatar, contact }) => (
            <ListItemCard key={id}>
              <div className="flex gap-2.5 items-center">
                <ListItemHeader src={avatar} />
                <ListItemBody title={`${name}`}>
                  <div className="flex flex-col gap-4">
                    <p className="font-roboto font-normal text-sm text-[#696969] leading-[18px] tracking-[-1%]">
                      {contact}
                    </p>
                  </div>
                </ListItemBody>
              </div>
              <ListItemFooter>
                <Link
                  to="/recipient-details"
                  className="flex items-center justify-center p-3 bg-[#EBEBF9] rounded-full"
                >
                  <InfoIcon className="size-6" strokeWidth={2} />
                </Link>
              </ListItemFooter>
            </ListItemCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipients;
