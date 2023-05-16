import { FC, useEffect, useState } from "react";
import ChatHeader from "../components/Chat/ChatHeader";
import ChatView from "../components/Chat/ChatView";
import { ConversationInfo } from "../shared/types";
import InputSection from "../components/Input/InputSection";
import SideBar from "../components/Home/SideBar";
import Account from "../components/Home/Account";
import { db } from "../shared/firebase";
import { doc } from "firebase/firestore";
import { useDocumentQuery } from "../hooks/useDocumentQuery";
import { useParams } from "react-router-dom";
import { useStore } from "../store";

const Chat: FC = () => {
  const { id } = useParams();

  // lay data "tu" collection conversation tren firebase
  const { data, loading, error } = useDocumentQuery(
    `conversation-${id}`,
    doc(db, "conversations", id as string)
  );

  // lay data "cua" collection conversation tren firebase
  const conversation = data?.data() as ConversationInfo;

  const currentUser = useStore((state) => state.currentUser);

  const [inputSectionOffset, setInputSectionOffset] = useState(0);

  const [replyInfo, setReplyInfo] = useState(null);

  // theme mac dinh cua doan chat #0068FF
  useEffect(() => {
    if (conversation?.theme)
      document.body.style.setProperty("--primary-color", conversation.theme);
  }, [conversation?.theme || ""]);

  return (
    <div className="flex">
      {/* Left-bar voi nut Sign out */}
      <Account />

      {/* Message list */}
      <SideBar />
      <div className="flex h-screen flex-grow flex-col items-stretch">
        {loading ? (
          <>
            <div className="border-lighten h-20 border-b"></div>
            <div className="flex-grow"></div>
            <InputSection disabled />
          </>
        ) : !conversation ||
          error ||
          // Neu khong dung user id voi user conversation thi se loi
          !conversation.users.includes(currentUser?.uid as string) ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded">
            <img
              className="h-32 w-32 rounded object-cover"
              src="/error.svg"
              alt=""
            />
            <p className="text-dark-lighten text-center text-lg">
              Conversation does not exists
            </p>
          </div>
        ) : (
          <>
            {/* hien thi ten doan chat va cac nut chuc nang  */}
            <ChatHeader conversation={conversation} />
            {/* content doan chat */}
            <ChatView
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              inputSectionOffset={inputSectionOffset}
              conversation={conversation}
            />
            {/* input va cac nut chuc nang */}
            <InputSection
              setInputSectionOffset={setInputSectionOffset}
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              disabled={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
