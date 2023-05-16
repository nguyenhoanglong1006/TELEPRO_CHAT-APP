import { DEFAULT_AVATAR, IMAGE_PROXY } from "../../shared/constants";
import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, orderBy, query, where } from "firebase/firestore";
import { ConversationInfo } from "../../shared/types";
import CreateConversation from "./CreateConversation";
import SelectConversation from "./SelectConversation";
import Spin from "react-cssfx-loading/src/Spin";
import { db } from "../../shared/firebase";
import { useCollectionQuery } from "../../hooks/useCollectionQuery";
import { useStore } from "../../store";
import Search from "./Search";

// UI message list
const SideBar: FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const [createConversationOpened, setCreateConversationOpened] =
    useState(false);

  const { data, error, loading } = useCollectionQuery(
    "conversations",
    query(
      collection(db, "conversations"),
      orderBy("updatedAt", "desc"),
      where("users", "array-contains", currentUser?.uid)
    )
  );

  const location = useLocation();

  return (
    <>
      <div
        className={`bg-light border-lighten h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden border-r ${
          location.pathname !== "/"
            ? "hidden w-[350px] md:!block"
            : "w-full md:!w-[350px]"
        }`}
      >
        <div className="h-15 flex items-center justify-between px-6 py-3 pt-5">
          <Link to="/" className="flex items-center gap-1">
            <h1 className="text-dark text-3xl md:font-bold">Chats</h1>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCreateConversationOpened(true)}
              className="bg-light hover:bg-lighten h-10 w-10 rounded-full "
            >
              <i className="bx bxs-edit text-secondary text-xl "></i>
            </button>
          </div>
        </div>
        <Search />

        {loading ? (
          <div className="my-6 flex justify-center">
            <Spin />
          </div>
        ) : error ? (
          <div className="my-6 flex justify-center">
            <p className="text-dark-lighten text-center">
              Something went wrong
            </p>
          </div>
        ) : data?.empty ? (
          <div className="my-6 flex flex-col items-center justify-center">
            <p className="text-dark-lighten text-center">
              No conversation found
            </p>
            <button
              onClick={() => setCreateConversationOpened(true)}
              className="text-primary text-center"
            >
              Create one
            </button>
          </div>
        ) : (
          <div>
            {data?.docs.map((item) => (
              <SelectConversation
                key={item.id}
                conversation={item.data() as ConversationInfo}
                conversationId={item.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Open modal tao conversation moi */}
      {createConversationOpened && (
        <CreateConversation setIsOpened={setCreateConversationOpened} />
      )}
    </>
  );
};

export default SideBar;
