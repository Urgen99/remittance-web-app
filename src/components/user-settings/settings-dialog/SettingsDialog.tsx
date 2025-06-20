import { DashboardIcons, UserSettingsIcons } from "@/components/icons/Icons";
import UserSettingsLayout from "@/components/layouts/UserSettingsLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full px-1.5 py-2 hover:bg-white rounded-[8px] flex justify-start items-center gap-2 font-inter font-[475] text-sm tracking-[-0.05px] text-[#696969]`}
        >
          <DashboardIcons.Settings />
          <span>Setting and profile</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="gap-0 p-0 w-full !max-w-[54.35rem] min-h-[40.68rem]"
        Icon={UserSettingsIcons.Close}
        aria-description="user-settings"
        aria-describedby="user-settings"
        iconClassName="-mt-0.5 right-10 focus:!ring-transparent focus:!ring-0 focus:!ring-offset-0 opacity-100 transition-none ring-offset-none"
      >
        {/* SETTINGS HEADER */}
        <DialogHeader className="bg-[#EBEBF9] h-12 px-6  py-4 rounded-t-[8px] flex items-center gap-1 flex-row ">
          <DialogTitle>
            <UserSettingsIcons.Notes />
          </DialogTitle>
          <DialogDescription className="font-general-sans font-medium text-base leading-5 tracking-[-1%] text-[#0A090B]">
            Setting and profile
          </DialogDescription>
        </DialogHeader>
        {/* SETTINGS CONTENT */}
        <UserSettingsLayout />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
