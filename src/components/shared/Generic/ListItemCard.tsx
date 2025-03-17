import { UserIcons } from "@/components/icons/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface ListItemCardProps {
  children: React.ReactNode;
}
const ListItemCard: React.FC<ListItemCardProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="h-[1px] bg-gradient-to-r from-[#E0E0E0] via-[#7A7A7A] to-[#E0E0E0]" />
      <div className="flex items-center justify-between py-3">{children}</div>
    </div>
  );
};

interface ListItemHeaderProps {
  Icon?: React.FC;
  src?: string;
}
const ListItemHeader: React.FC<ListItemHeaderProps> = ({ Icon, src }) => {
  return (
    <div
      className={`rounded-full ${
        Icon ? "bg-[#46275A0F]" : "bg-[#F5F8FF]"
      } p-2 flex items-center justify-center`}
    >
      {Icon ? (
        <Icon />
      ) : (
        <Avatar className="!size-10">
          <AvatarImage src={src} alt="user profile image" />
          <AvatarFallback>
            <UserIcons.Default />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

const ListItemBody: React.FC<ListItemCardProps & { title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="font-general-sans text-base leading-[20.8px] font-medium tracking-[-1%]">
        {title}
      </h5>
      <div>{children}</div>
    </div>
  );
};

const ListItemFooter: React.FC<ListItemCardProps> = ({ children }) => {
  return children;
};

export { ListItemBody, ListItemCard, ListItemFooter, ListItemHeader };
