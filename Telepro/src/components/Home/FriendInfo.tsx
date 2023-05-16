import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useLastMessage } from "../../hooks/useLastMessage";
import { useUsersInfo } from "../../hooks/useUsersInfo";
import { DEFAULT_AVATAR, IMAGE_PROXY, UNKNOWN } from "../../shared/constants";
import { ConversationInfo } from "../../shared/types";
import { useStore } from "../../store";

interface FriendInfoProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  conversation: ConversationInfo;
}

const FriendInfo: FC<FriendInfoProps> = ({
  isOpened,
  setIsOpened,
  conversation,
}) => {
  const { data: users, loading } = useUsersInfo(conversation.users);
  const currentUser = useStore((state) => state.currentUser);

  const filtered = users?.filter((user) => user.id !== currentUser?.uid);

  const { id } = useParams();

  return (
    <div
      onClick={() => setIsOpened(false)}
      className={`fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080] transition-all duration-300 ${
        isOpened ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-light-blue mx-2 w-full max-w-[550px] rounded-lg"
      >
        <div className="border-lighten flex items-center justify-between border-b py-3 px-3">
          <div className="flex-1"></div>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-dark whitespace-nowrap text-center text-2xl">
              Profile
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <button
              onClick={() => setIsOpened(false)}
              className="bg-light-blue flex h-8 w-8 items-center justify-center rounded-full"
            >
              <i className="bx bx-x text-dark text-2xl"></i>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-4">
            <img
              className="h-30 w-30 rounded-full object-cover"
              src={
                filtered?.[0]?.data()?.photoURL
                  ? IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)
                  : DEFAULT_AVATAR
              }
              alt=""
            />
            <div className="">
              <h1 className="text-dark-lighten text-xl">
                {filtered?.[0].data()?.displayName
                  ? filtered?.[0].data()?.displayName
                  : UNKNOWN}
              </h1>
              <p className="text-dark-lighten">
                ID:{" "}
                {filtered?.[0].data()?.uid
                  ? filtered?.[0].data()?.uid
                  : UNKNOWN}
              </p>
              <p className="text-dark-lighten">
                Email:{" "}
                {filtered?.[0].data()?.email
                  ? filtered?.[0].data()?.email
                  : UNKNOWN}
              </p>
              <p className="text-dark-lighten">
                Phone Number:{" "}
                {filtered?.[0].data()?.phoneNumber
                  ? filtered?.[0].data()?.phoneNumber
                  : UNKNOWN}
              </p>
            </div>
          </div>

          <p className="mt-4 text-gray-500">
            Change google / facebook avatar or username to update it here
          </p>
        </div>
      </div>
    </div>
  );
};

export default FriendInfo;
