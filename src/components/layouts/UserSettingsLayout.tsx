import { useState } from "react";
import { UserSettingsIcons } from "../icons/Icons";
import UserSettingsSidebar from "../shared/Sidebar/UserSettingsSidebar";
import { Tabs, TabsContent } from "../ui/tabs";
import AccountPrivacy from "../user-settings/account-privacy/AccountPrivacy";
import HelpSupport from "../user-settings/get-help/HelpSupport";
import PersonalInformation from "../user-settings/personal-information/PersonalInformation";
import PrivacyPolicy from "../user-settings/privacy-policy/PrivacyPolicy";
import ReportBug from "../user-settings/report-bug/ReportBug";
import TermsConditions from "../user-settings/terms-conditions/TermsConditions";
import TransactionLimit from "../user-settings/transaction-limit/TransactionLimit";
const tabs = [
  {
    Icon: UserSettingsIcons.UserCircle,
    title: "Personal details",
    value: "personal-details",
    Component: <PersonalInformation />,
  },
  {
    Icon: UserSettingsIcons.Password,
    title: "Account and Privacy",
    value: "account-and-privacy",
    Component: <AccountPrivacy />,
  },
  {
    Icon: UserSettingsIcons.DollarCircle,
    title: "Get help",
    value: "get-help",
    Component: <HelpSupport />,
  },
  {
    Icon: UserSettingsIcons.Warning,
    title: "Report a bug",
    value: "report-a-bug",
    Component: <ReportBug />,
  },
  {
    Icon: UserSettingsIcons.Block,
    title: "Transaction limit",
    value: "transaction-limit",
    Component: <TransactionLimit />,
  },
  {
    Icon: UserSettingsIcons.Article,
    title: "Terms and conditions",
    value: "terms-and-conditions",
    Component: <TermsConditions />,
  },
  {
    Icon: UserSettingsIcons.Shield,
    title: "Privacy policy",
    value: "privacy-policy",
    Component: <PrivacyPolicy />,
  },
];

const UserSettingsLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const handleTabChange = (tab: string) => setActiveTab(tab);

  const activeComponent = tabs.find(
    (tab) => tab.value === activeTab
  )?.Component;
  return (
    <section className="flex w-full">
      <Tabs
        defaultValue={tabs[0].value}
        className=" w-full min-h-[37.65rem] flex-row gap-4"
      >
        <UserSettingsSidebar
          tabs={tabs}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />

        <TabsContent value={activeTab}>{activeComponent}</TabsContent>
      </Tabs>
    </section>
  );
};

export default UserSettingsLayout;
