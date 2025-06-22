import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DocumentProps } from "./PersonalInformation";
import TextIconContainer from "./TextIconContainer";

const EditDocuments: React.FC<{
  documents: DocumentProps;
  handlePrev: (args: string) => void;
}> = ({ documents, handlePrev }) => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <Button
            className="hover:bg-transparent size-fit cursor-pointer"
            onClick={() => handlePrev("user-details")}
            variant="ghost"
          >
            <DialogSettingsIcons.ChevronLeft />
          </Button>
          <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
            Edit your documents
          </h3>
        </div>

        <div className="bg-gradient-to-r from-[#E0E0E0] via-[#7A7A7A] to-[#E0E0E0] h-0.5" />

        <div className="flex flex-col gap-4">
          <div className="bg-[#EBEBF9] px-3 py-4 rounded-[4px] border-[#5900FF59] border">
            <p className="font-roboto font-normal text-sm leading-[18px] tracking-[-1%] text-[#3333C1]">
              You can't remove documentation but can update images or switch the
              type, e.g., from citizenship to a driver's license or passport.
            </p>
          </div>

          <div className="flex flex-col gap-[18px]">
            <div>
              <TextIconContainer
                Icon={DialogSettingsIcons.Location}
                text="CURRENT DOCUMENTS"
              />
            </div>

            <div className="flex items-center gap-3.5">
              {documents.image.map(({ side }: { side: string }) => (
                <DocumentCard
                  key={side}
                  title={documents.type}
                  subtitle={side}
                />
              ))}
            </div>

            <div className="select-none flex justify-between items-center gap-[22px]">
              <Separator className="flex-[0.5] h-[1px] bg-[#E0E0E0] w-full" />
              <div className="bg-white">
                <h6 className="font-mukta text-base leading-5 text-[#696969] font-normal">
                  OR
                </h6>
              </div>
              <Separator className="flex-[0.5] h-[1px] bg-[#E0E0E0] w-full" />
            </div>

            <Button
              variant="ghost"
              className="justify-start cursor-pointer bg-[#EBEBF9] px-3 py-1.5 pl-1.5 pr-4 rounded-[4px] hover:bg-[#EBEBF9] "
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#FBFBFB] rounded-full size-7 flex items-center justify-center p-1">
                  <DialogSettingsIcons.UserAdd />
                </div>
                <p className="font-mukta font-medium text-base leading-7 text-[#3333C1]">
                  Add different Documentation
                </p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDocuments;

const DocumentCard = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Card className="shadow-xs p-3 max-w-[17.75rem] h-[10.6rem] w-full gap-3 bg-transparent rounded-[6px] border-[#0000001A] border">
      <CardHeader className="shadow-none p-0 rounded-[4px] justify-between h-full">
        <div className="bg-[#EBEBF9] rounded-[4px] size-[26px] flex items-center justify-center">
          <DialogSettingsIcons.File />
        </div>

        <div className="flex flex-col gap-3 max-w-[6.8rem] w-full">
          <CardTitle className="font-roboto font-medium text-sm tracking-[-1%] leading-5 text-[#222222]">
            {title} {subtitle}
          </CardTitle>

          <Button className="bg-[#3333C1] hover:bg-[#3333C1] cursor-pointer h-7 w-fit !px-2 !py-[6px]">
            <span className="font-roboto text-sm font-normal leading-[18px] tracking-[-1%]">
              Update
            </span>{" "}
            <DialogSettingsIcons.Refresh />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
