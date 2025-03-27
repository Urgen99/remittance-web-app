import { DialogSettingsIcons } from "@/components/icons/Icons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
type SettingsLists = {
  Icon: React.FC;
  title: string;
  isSwitch?: boolean;
  id: string;
};

const settingsLists: SettingsLists[] = [
  {
    Icon: DialogSettingsIcons.Mail,
    title: "Update email",
    id: "update-email",
  },
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
  {
    Icon: DialogSettingsIcons.FramePerson,
    title: "Enable face ID",
    isSwitch: true,
    id: "face-id",
  },
  {
    Icon: DialogSettingsIcons.Cancel,
    title: "Close your account",
    id: "close-account",
  },
];
const InitialSettings = () => {
  return (
    <div className="bg-[#F6F6F6] p-3 flex flex-col gap-3 rounded-[4px]">
      {settingsLists.map(({ Icon, title, isSwitch, id }, index: number) => (
        <div key={title} className="flex flex-col gap-3">
          <Label
            className="flex justify-between cursor-pointer items-center"
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

            {isSwitch && (
              <Switch
                className="data-[state=unchecked]:bg-[#95959B] data-[state=checked]:bg-[#3333C1]"
                id={id}
              />
            )}
          </Label>

          {settingsLists.length - 1 !== index && (
            <div className="border border-[#E0E0E0]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default InitialSettings;
