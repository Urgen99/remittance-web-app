import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import { DocumentProps } from "./PersonalInformation";
import SimpleTextContainer from "./SimpleTextContainer";
import TextIconContainer from "./TextIconContainer";

const UserDetails: React.FC<{
  documents: DocumentProps;
  handleNext: (arg: string) => void;
}> = ({ documents, handleNext }) => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
            Personal information
          </h3>
        </div>

        <div className="bg-gradient-to-r from-[#E0E0E0] via-[#7A7A7A] to-[#E0E0E0] h-0.5" />
        <div className="flex flex-col gap-8 overflow-y-scroll max-h-[32.5rem]">
          <div className="flex flex-col gap-4">
            <TextIconContainer
              Icon={DialogSettingsIcons.Face}
              text="PERSONAL / DOCS  INFO"
            />

            <div className="flex flex-col gap-2 px-3 py-1 shadow-xs">
              <div className="flex flex-col gap-2">
                <SimpleTextContainer title="FIRST NAME" content="Ranjit" />
                <div className="border-b border-[#E0E0E0] " />
              </div>

              <div className="flex flex-col gap-2">
                <SimpleTextContainer title="MIDDLE NAME" content="Kumar" />
                <div className="border-b border-[#E0E0E0] " />
              </div>

              <div className="flex flex-col gap-2">
                <SimpleTextContainer title="LAST NAME" content="Shrestha" />
                <div className="border-b border-[#E0E0E0] " />
              </div>

              <div className="flex flex-col gap-2">
                <SimpleTextContainer title="DOCUMENT" content="Passport" />
                <div className="border-b border-[#E0E0E0] " />
              </div>

              <div className="flex flex-col gap-2">
                <SimpleTextContainer
                  title="DOC EXPIRY DATE"
                  content="1990-12-11 (2 Days left)"
                />
                <div className="border-b border-[#E0E0E0] " />
              </div>

              <div className="flex flex-col gap-2">
                <SimpleTextContainer
                  title="DOCUMENT NO"
                  content="112-11-23123"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <TextIconContainer
              Icon={DialogSettingsIcons.Location}
              text="RESIDENCY INFORMATION"
            />

            <div className="flex flex-col gap-2 px-3 py-1 shadow-xs">
              <div className="flex flex-col gap-2">
                <SimpleTextContainer title="COUNTRY" content="AUSTRALIA" />
                <div className="border-b border-[#E0E0E0] " />
              </div>

              <div className="flex flex-col gap-2">
                <SimpleTextContainer
                  title="STREET"
                  content="12th street, Sydney Australia"
                />
                <div className="border-b border-[#E0E0E0] " />
              </div>

              <div className="flex flex-col gap-2">
                <SimpleTextContainer title="CITY" content="Sydney" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5 bg-[#EBEBF9]">
            <div className="flex justify-between items-center">
              <TextIconContainer
                Icon={DialogSettingsIcons.Location}
                text="UPLOADED DOCUMENTS"
              />

              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-fit text-[#3333C1] text-sm font-roboto  leading-[18px] tracking-[-1%] font-normal cursor-pointer hover:bg-transparent hover:text-[#3333C1]"
                onClick={() => handleNext("edit-documents")}
              >
                Edit document
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {documents.image &&
                documents?.image?.map(
                  ({ side, src }: { side: string; src: string }) => (
                    <DocumentCard
                      title={documents.type}
                      subtitle={`(${side.slice(0, 1).toUpperCase()})`}
                      image={src}
                    />
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

const DocumentCard = ({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <Card className="shadow-none p-0 max-w-[16.85rem] w-full gap-3 bg-transparent rounded-[4px]">
      <CardHeader className="shadow-none p-0 rounded-[4px]">
        <img
          src={image}
          alt={title + " image"}
          className="rounded-[4px] w-full"
        />
      </CardHeader>

      <CardFooter className="bg-white rounded-[4px] px-3 py-2">
        <h6 className="font-roboto font-medium text-sm tracking-[-1%] leading-5 text-[#222222]">
          {title} {subtitle}
        </h6>
      </CardFooter>
    </Card>
  );
};
