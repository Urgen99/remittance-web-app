import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { JSX } from "react";
type SettingsLists = {
  Icon: () => JSX.Element;
  title: string;
  isSwitch?: boolean;
  id: string;
};

const settingsLists: SettingsLists[] = [
  // {
  //   Icon: DialogSettingsIcons.Mail,
  //   title: "Update email",
  //   id: "update-email",
  // }, // disabled for now..
  {
    Icon: DialogSettingsIcons.Password,
    title: "Update password",
    id: "update-password",
  },
  {
    Icon: DialogSettingsIcons.Pin,
    title: "Update pin",
    id: "update-pin",
  },
  // {
  //   Icon: DialogSettingsIcons.FramePerson,
  //   title: "Enable face ID",
  //   isSwitch: true,
  //   id: "face-id",
  // },
  {
    Icon: DialogSettingsIcons.Cancel,
    title: "Close your account",
    id: "close-account",
  },
];
const InitialSettings = ({
  handleNext,
}: {
  handleNext: (args: string) => void;
}) => {
  return (
    <div className="h-full pt-4 pr-7">
      <div className="flex flex-col gap-5">
        <h3 className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
          Account and Privacy
        </h3>

        <div className="bg-[#F6F6F6] p-3 flex flex-col gap-3 rounded-[4px]">
          {settingsLists.map(({ Icon, title, isSwitch, id }, index: number) => (
            <div key={title} className="flex flex-col gap-3">
              <div>
                {!isSwitch && (
                  <button
                    onClick={() => handleNext(id)}
                    className="cursor-pointer w-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-[4px] p-1 bg-[#EBEBF9] flex items-center justify-center">
                        <Icon />
                      </div>

                      <h6 className="font-roboto text-black text-base leading-6 tracking-[-1%] font-normal">
                        {title}
                      </h6>
                    </div>
                  </button>
                )}

                {isSwitch && (
                  <>
                    <Label
                      className="flex justify-between items-center cursor-pointer"
                      htmlFor={id}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-[4px] p-1 bg-[#EBEBF9] flex items-center justify-center">
                          <Icon />
                        </div>

                        <h6 className="font-roboto text-black text-base leading-6 tracking-[-1%] font-normal">
                          {title}
                        </h6>
                      </div>

                      <Switch
                        className="data-[state=unchecked]:bg-[#95959B] data-[state=checked]:bg-[#3333C1]"
                        id={id}
                      />
                    </Label>
                  </>
                )}
              </div>

              {settingsLists.length - 1 !== index && (
                <div className="border border-[#E0E0E0]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitialSettings;
