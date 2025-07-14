import DataNotFound from "@/components/shared/DataNotFound";
import TextContainer from "@/components/shared/TextContainer";
import { selectCurrentUser } from "@/features/auth/auth.slice";
import { user } from "@/lib/constant";
import { useDispatch, useSelector } from "react-redux";
import CurrentTransactionRate from "./components/CurrentTransactionRate";
import RecentPeopleContainer from "./components/RecentPeopleContainer";
import RecentTransactions from "./components/RecentTransactions";
import ReferFriend from "./components/ReferFriend";
import { useGetUserByEmailQuery } from "@/features/users/userApi.slice";
import { useEffect } from "react";
import { setUsersData } from "@/features/users/users.slice";

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log("currentUser", currentUser);
  /* ---------- FOR TESTING ONLY ---------- */

  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetUserByEmailQuery(
    { email: currentUser as string },
    {
      pollingInterval: 1000 * 60 * 5, // 5 minutes
      refetchOnReconnect: true, // refetch when reconnected
      refetchOnMountOrArgChange: true,
    }
  );

  console.log("data", data);

  console.log(isLoading, isFetching);

  useEffect(() => {
    let mounted = true;

    if (data && mounted) {
      const { relatedId: id } = data?.data || {};
      dispatch(setUsersData({ id }));
    }

    return () => {
      mounted = false;
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <TextContainer title={`Welcome, ${currentUser}`} />
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
