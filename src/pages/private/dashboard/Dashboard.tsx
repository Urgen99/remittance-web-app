import DataNotFound from "@/components/shared/DataNotFound";
import TextContainer from "@/components/shared/TextContainer";
import { user } from "@/lib/constant";
import CurrentTransactionRate from "./components/CurrentTransactionRate";
import RecentPeopleContainer from "./components/RecentPeopleContainer";
import RecentTransactions from "./components/RecentTransactions";
import ReferFriend from "./components/ReferFriend";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col gap-6">
      <div>
        <TextContainer title="Welcome, User" />
      </div>

      <div className="flex justify-between items-center gap-4">
        <ReferFriend />
        <CurrentTransactionRate />
      </div>

      {!user.recentTransactions.length && !user.recentPeoples.length ? (
        <DataNotFound />
      ) : (
        <div className="flex justify-between gap-4">
          <RecentTransactions user={user as any} />
          <RecentPeopleContainer user={user as any} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
