import { useState } from "react";
import UserSettingsSidebar from "../shared/Sidebar/UserSettingsSidebar";
import { Tabs, TabsContent } from "../ui/tabs";
import tabs from "../user-settings/settings-tab";

const UserSettingsLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const handleTabChange = (tab: string) => setActiveTab(tab);

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

        {tabs.map(({ Component, value }) => (
          <TabsContent key={value} value={value}>
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default UserSettingsLayout;
