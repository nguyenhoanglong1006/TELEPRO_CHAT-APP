import { Link, useParams } from "react-router-dom";

import { ConversationInfo } from "../../shared/types";
import { FC } from "react";
import { DEFAULT_AVATAR, IMAGE_PROXY, UNKNOWN } from "../../shared/constants";
import Skeleton from "../Skeleton";
import { useLastMessage } from "../../hooks/useLastMessage";
import { useStore } from "../../store";
import { useUsersInfo } from "../../hooks/useUsersInfo";

interface SelectConversationProps {
  conversation: ConversationInfo;
  conversationId: string;
}

// List conversation
const SelectConversation: FC<SelectConversationProps> = ({
  conversation,
  conversationId,
}) => {
  const { data: users, loading } = useUsersInfo(conversation.users);
  const currentUser = useStore((state) => state.currentUser);

  const filtered = users?.filter((user) => user.id !== currentUser?.uid);

  const { id } = useParams();

  const {
    data: lastMessage,
    loading: lastMessageLoading,
    error: lastMessageError,
  } = useLastMessage(conversationId);

  // UI khi dang loading
  if (loading)
    return (
      <div className="flex items-stretch gap-2 py-2 px-5">
        <Skeleton className="h-14 w-14 flex-shrink-0 rounded-full" />
        <div className="flex flex-grow flex-col items-start gap-2 py-2">
          <Skeleton className="w-1/2 flex-grow" />
          <Skeleton className="w-2/3 flex-grow" />
        </div>
      </div>
    );

  //data cua conversation tu firebase
  if (conversation.users.length === 2)
    return (
      <Link
        to={`/${conversationId}`}
        className={`hover:bg-lighten relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${
          conversationId === id ? "!bg-[#d9d9d9]" : ""
        }`}
      >
        <img
          className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
          src={
            filtered?.[0]?.data()?.photoURL
              ? IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)
              : DEFAULT_AVATAR
          }
          alt=""
        />
        <div className="flex flex-grow flex-col items-start gap-1 py-1">
          <p className="text-dark max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
            {filtered?.[0].data()?.displayName
              ? filtered?.[0].data()?.displayName
              : UNKNOWN}
          </p>
          {lastMessageLoading ? (
            <Skeleton className="w-2/3 flex-grow" />
          ) : (
            <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
              {lastMessage?.message}
            </p>
          )}
        </div>
        {!lastMessageLoading && (
          <>
            {lastMessage?.lastMessageId !== null &&
              lastMessage?.lastMessageId !==
                conversation.seen[currentUser?.uid as string] && (
                <div className="bg-primary absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
              )}
          </>
        )}
      </Link>
    );

  // render UI conversation da tao cua user
  return (
    <Link
      to={`/${conversationId}`}
      className={`hover:bg-lighten group relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${
        conversationId === id ? "!bg-[#d9d9d9]" : ""
      }`}
    >
      {conversation?.group?.groupImage ? (
        <img
          className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
          src={conversation.group.groupImage}
          alt=""
        />
      ) : (
        <div className="relative h-14 w-14">
          <img
            className="absolute top-0 right-0 h-10 w-10 flex-shrink-0 rounded-full object-cover"
            src={
              filtered?.[0]?.data()?.photoURL
                ? IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)
                : DEFAULT_AVATAR
            }
            alt=""
          />
          <img
            className={`border-less-lighten group-hover:border-less-lighten absolute bottom-0 left-0 z-[1] h-10 w-10 flex-shrink-0 rounded-full object-cover transition duration-300 ${
              conversationId === id ? "!border-[#d9d9d9]" : ""
            }`}
            src={
              filtered?.[1]?.data()?.photoURL
                ? IMAGE_PROXY(filtered?.[1]?.data()?.photoURL)
                : DEFAULT_AVATAR
            }
            alt=""
          />
        </div>
      )}
      <div className="flex flex-grow flex-col items-start gap-1 py-1">
        <p className="text-dark max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
          {conversation?.group?.groupName ||
            filtered
              ?.map((user) =>
                user.data()?.displayName ? user.data()?.displayName : UNKNOWN
              )
              .slice(0, 3)
              .join(", ")}
        </p>
        {lastMessageLoading ? (
          <Skeleton className="w-2/3 flex-grow" />
        ) : (
          <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
            {lastMessage?.message}
          </p>
        )}
      </div>
      {!lastMessageLoading && (
        <>
          {lastMessage?.lastMessageId !== null &&
            lastMessage?.lastMessageId !==
              conversation.seen[currentUser?.uid as string] && (
              <div className="bg-primary absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
            )}
        </>
      )}
    </Link>
  );
};

export default SelectConversation;
