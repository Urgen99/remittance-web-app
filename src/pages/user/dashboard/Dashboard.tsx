import DataNotFound from "@/components/shared/DataNotFound";
import TextContainer from "@/components/shared/TextContainer";
import { user } from "@/lib/constant";
import CurrentTransactionRate from "./components/CurrentTransactionRate";
import RecentTransactions from "./components/RecentTransactions";
import ReferFriend from "./components/ReferFriend";

const Dashboard = () => {
  return (
    <div className="border-2 border-red-500 flex flex-col gap-6">
      <div>
        <TextContainer title="Welcome, User" />
      </div>

      <div className="flex items-center gap-4">
        <ReferFriend />
        <CurrentTransactionRate />
      </div>

      {!user.recentTransactions.length && !user.recentPeoples.length ? (
        <DataNotFound />
      ) : (
        <div className="flex gap-4">
          <RecentTransactions user={user as any} />
          <div>ad</div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
