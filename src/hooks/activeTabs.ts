import { useState } from "react";

const useActiveTabs = (tab: string) => {
  const [activeTab, setActiveTab] = useState(tab);

  const handleTabChange = (tab: string) => setActiveTab(tab);
  return {
    activeTab,
    setActiveTab,
    handleTabChange,
  };
};

export default useActiveTabs;
