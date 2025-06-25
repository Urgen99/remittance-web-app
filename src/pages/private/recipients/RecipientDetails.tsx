import { TransactionIcons } from "@/components/icons/Icons";
import DataNotFound from "@/components/shared/DataNotFound";
import {
  ListItemBody,
  ListItemCard,
  ListItemFooter,
  ListItemHeader,
} from "@/components/shared/Generic/ListItemCard";
import TextContainer from "@/components/shared/TextContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/lib/constant";
import {
  getRandomColor,
  getStatusColor,
  getTextColor,
  getUserInitials,
  userColorPalettes,
} from "@/lib/getColors";
import { useParams } from "react-router-dom";
import AccountDetails from "./components/AccountDetails";
const RecipientDetails = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <TextContainer title="Recipient details" />
      </div>

      <div className="flex flex-col gap-28">
        <div className="relative">
          <div
            className="px-4 py-6 rounded-[6px] bg-[#2E2EB0] bg-gradient-to-b from-[#2E2EB0] to-[#0B3984] min-h-[6.75rem] bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('/icons/recipientsPattern.svg')" }}
          />

          <div className="absolute top-14 flex flex-col gap-2">
            <Avatar className="size-[5.5rem]">
              <AvatarImage src={user.avatar} alt={`${user.name}'s profile`} />
              <AvatarFallback
                className="font-roboto font-normal text-4xl leading-6 tracking-[-1%]"
                style={{
                  backgroundColor: getRandomColor(user?.name, userColorPalettes)
                    .bg,
                  color: getRandomColor(user?.name, userColorPalettes).text,
                }}
              >
                {getUserInitials(user?.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0.5">
              <h3 className="font-general-sans font-semibold text-xl leading-8 text-[#1b1b1b]">
                {user?.name}
              </h3>
              <p className="font-inter font-[475] text-sm text-[#696969] leading-5 tracking-[-0.05px]">
                {user?.contact}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-[22px] justify-between">
          <div className="max-w-[30.65rem] 2xl:max-w-full w-full">
            <AccountDetails user={user} />
          </div>

          <div className="max-w-2xl 2xl:max-w-full w-full flex flex-col gap-4">
            <h3 className="font-general-sans font-medium text-lg leading-[120%] tracking-[-2%] text-[#0A090B]">
              Transactions with user
            </h3>

            <div className="rounded-[6px]">
              {user.recentTransactions.length > 0 ? (
                user?.recentTransactions.map(
                  ({ id, amount, receiver, status, method }: any) => (
                    <ListItemCard key={id}>
                      <div className="flex gap-3 items-center">
                        <ListItemHeader Icon={TransactionIcons.ArrowRight} />
                        <ListItemBody title={`To ${receiver}`}>
                          <div className="flex items-center gap-1">
                            <div
                              className={`rounded-full w-1 h-2.5 ${getStatusColor(
                                status
                              )}`}
                            />
                            <p
                              className={`font-roboto text-sm leading-[20.8px] tracking-[-1%] capitalize ${getTextColor(
                                status
                              )}`}
                            >
                              {status}
                            </p>
                          </div>
                        </ListItemBody>
                      </div>
                      <ListItemFooter>
                        <div className="flex flex-col gap-4 items-end">
                          <h5 className="font-general-sans text-lg leading-[20.8px] font-medium tracking-[-2%] text-[#3333C1]">
                            $ {amount}
                          </h5>
                          <p className="font-roboto text-sm leading-[18px] tracking-[-1%] text-[#696969] font-normal">
                            {method}
                          </p>
                        </div>
                      </ListItemFooter>
                    </ListItemCard>
                  )
                )
              ) : (
                <DataNotFound />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientDetails;
