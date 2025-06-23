import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { UserData } from "./PersonalInformation";
import SimpleTextContainer from "./SimpleTextContainer";
import TextIconContainer from "./TextIconContainer";

type UserDetails = {
  handleNext: (arg: string) => void;
  kycData: UserData;
};

const UserDetails = ({ handleNext, kycData }: UserDetails) => {
  const { addressDetails, documentDetails, personalDetails } = kycData;

  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
            Personal information
          </h3>
        </div>

        <div className="bg-gradient-to-r from-[#E0E0E0] via-[#7A7A7A] to-[#E0E0E0] h-0.5" />

        {kycData && (
          <div className="flex flex-col gap-8 overflow-y-scroll max-h-[32.5rem]">
            <div className="flex flex-col gap-4">
              <TextIconContainer
                Icon={DialogSettingsIcons.Face}
                text={personalDetails.title}
              />

              <div className="flex flex-col gap-2 px-3 py-1 shadow-sm">
                {personalDetails.data &&
                  personalDetails.data.map(({ subtitle, content }, index) => (
                    <div key={subtitle}>
                      <div className="flex flex-col gap-2">
                        <SimpleTextContainer
                          title={subtitle}
                          content={content}
                        />

                        {index !== personalDetails.data.length - 1 && (
                          <div className="border-b border-[#E0E0E0] " />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <TextIconContainer
                Icon={DialogSettingsIcons.Location}
                text={addressDetails.title}
              />

              <div className="flex flex-col gap-2 px-3 py-1 shadow-sm">
                {addressDetails.data &&
                  addressDetails.data.map(({ subtitle, content }, index) => (
                    <div key={subtitle}>
                      <div className="flex flex-col gap-2">
                        <SimpleTextContainer
                          title={subtitle}
                          content={content}
                        />

                        {index !== addressDetails.data.length - 1 && (
                          <div className="border-b border-[#E0E0E0] " />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 bg-[#EBEBF9]">
              <div className="flex justify-between items-center">
                <TextIconContainer
                  Icon={DialogSettingsIcons.Location}
                  text={documentDetails.title}
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

              <div className="flex items-center gap-2 max">
                {documentDetails.data &&
                  documentDetails.data.map(({ side, content, subtitle }) => (
                    <DocumentCard
                      key={side}
                      title={subtitle?.toLowerCase()?.replace("_", " ")}
                      subtitle={`(${side?.slice(0, 1).toUpperCase()})`}
                      image={content}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
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
      <CardHeader className="shadow-none p-0 rounded-[4px] h-48">
        <img
          src={image}
          alt={title + " image"}
          className="rounded-[4px] w-full object-cover h-full"
        />
      </CardHeader>

      <CardFooter className="bg-white rounded-[4px] px-3 py-2">
        <h6 className="font-roboto font-medium text-sm tracking-[-1%] leading-5 text-[#222222] capitalize">
          {title} {subtitle}
        </h6>
      </CardFooter>
    </Card>
  );
};
