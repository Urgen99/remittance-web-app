import { DialogSettingsIcons } from "@/components/icons/Icons";
import TextIconContainer from "./TextIconContainer";
import SimpleTextContainer from "./SimpleTextContainer";

const PersonalInformation = () => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-3">
        <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
          Personal information
        </h3>

        <div className="bg-gradient-to-r from-[#E0E0E0] via-[#7A7A7A] to-[#E0E0E0] h-0.5" />

        <div className="flex flex-col gap-8 overflow-scroll max-h-[32.5rem]">
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

          <div className="flex flex-col gap-4">
            <TextIconContainer
              Icon={DialogSettingsIcons.Location}
              text="UPLOADED DOCUMENTS"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
