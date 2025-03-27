import { useState } from "react";
import { UserSettingsIcons } from "../icons/Icons";
import UserSettingsSidebar from "../shared/Sidebar/UserSettingsSidebar";
import { Tabs, TabsContent } from "../ui/tabs";
const tabs = [
  {
    Icon: UserSettingsIcons.UserCircle,
    title: "Personal details",
    value: "personal-details",
    Component: <div className="h-full">Personal Details</div>,
  },
  {
    Icon: UserSettingsIcons.Password,
    title: "Account and Privacy",
    value: "account-and-privacy",
    Component: <div className="h-full">Account and Privacy</div>,
  },
  {
    Icon: UserSettingsIcons.DollarCircle,
    title: "Get help",
    value: "get-help",
    Component: <div className="h-full">Get Help</div>,
  },
  {
    Icon: UserSettingsIcons.Warning,
    title: "Report a bug",
    value: "report-a-bug",
    Component: <div className="h-full">Report a Bug</div>,
  },
  {
    Icon: UserSettingsIcons.Block,
    title: "Transaction limit",
    value: "transaction-limit",
    Component: <div className="h-full">Transaction Limit</div>,
  },
  {
    Icon: UserSettingsIcons.Article,
    title: "Terms and conditions",
    value: "terms-and-conditions",
    Component: <div className="h-full">Term And Condition</div>,
  },
  {
    Icon: UserSettingsIcons.Shield,
    title: "Privacy policy",
    value: "privacy-policy",
    Component: <div className="h-full">Privacy Policy</div>,
  },
];

const UserSettingsLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const activeComponent = tabs.find(
    (tab) => tab.value === activeTab
  )?.Component;
  return (
    <section className="flex w-full">
      <Tabs
        defaultValue={tabs[0].value}
        className=" w-full min-h-[37.65rem] flex-row"
      >
        <UserSettingsSidebar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabsContent value={activeTab}>{activeComponent}</TabsContent>
      </Tabs>
    </section>
  );
};

export default UserSettingsLayout;
