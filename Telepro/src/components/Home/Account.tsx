import { DEFAULT_AVATAR, IMAGE_PROXY } from "../../shared/constants";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from "../ClickAwayListener";
import CreateChatVideo from "./CreateVideoChat";
import CreateConversation from "./CreateConversation";
import { auth } from "../../shared/firebase";
import { signOut } from "firebase/auth";
import { useStore } from "../../store";
import UserInfo from "./UserInfo";

// Account-bar with sign out button, profile user
const Account: FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const [createChatVideoOpened, setCreateChatVideoOpened] = useState(false);
  const [createConversationOpened, setCreateConversationOpened] =
    useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isUserInfoOpened, setIsUserInfoOpened] = useState(false);

  return (
    <>
      <div className="bg-secondary flex flex h-screen flex-col items-center justify-between border border-none  py-6">
        <div className="flex flex-col items-center">
          <Link to="/" className="mb-20 flex items-center gap-1">
            <img className="h-8 w-8" src="/icon.svg" alt="" />
          </Link>
          <div className="flex flex-col items-center">
            {/* open create chat modal */}
            <button
              onClick={() => setCreateConversationOpened(true)}
              className={`bg-secondary hover:bg-hover-blue items-center rounded px-5 py-5 transition duration-300`}
            >
              <i className="bx bx-message-detail text-3xl" color="black"></i>
            </button>
            {/* open chatvideo modal */}

            <div className="d-flex text-black">
              <Link
                style={{ color: "#FFFFFF", textDecoration: "none" }}
                to="/p2p"
              >
                <button
                  className={`bg-secondary hover:bg-hover-blue  items-center rounded px-5 py-5 transition duration-300`}
                >
                  <i className="bx bxs-video text-3xl" color="black"></i>
                </button>
              </Link>
            </div>
            <button
              onClick={() => setCreateChatVideoOpened(true)}
              className={`bg-secondary hover:bg-hover-blue items-center rounded px-5 py-5 transition duration-300`}
            >
              <i className="bx bxs-contact text-3xl" color="black"></i>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* click tren avatar de hien pop-up */}
          <ClickAwayListener onClickAway={() => setIsPopupOpened(false)}>
            {(ref) => (
              <div
                ref={ref}
                className="hover:bg-hover-blue relative z-10 rounded-full px-1 py-1"
              >
                <img
                  onClick={() => setIsPopupOpened((prev) => !prev)}
                  className="  h-12 w-12 cursor-pointer rounded-full object-cover  "
                  src={
                    currentUser?.photoURL
                      ? IMAGE_PROXY(currentUser.photoURL)
                      : DEFAULT_AVATAR
                  }
                  alt=""
                />

                <div
                  className={`border-dark-lighten bg-dark absolute bottom-full left-full flex w-max origin-bottom-left flex-col items-stretch overflow-hidden rounded-lg border py-1 shadow-lg transition-all duration-200 ${
                    isPopupOpened
                      ? "visible scale-100 opacity-100"
                      : "invisible scale-0 opacity-0"
                  }`}
                >
                  {/* button profile user */}
                  <button
                    onClick={() => {
                      setIsUserInfoOpened(true);
                      setIsPopupOpened(false);
                    }}
                    className="hover:bg-dark-lighten flex items-center gap-1 px-3 py-1 transition duration-300"
                  >
                    <i className="bx bxs-user text-xl"></i>
                    <span className="whitespace-nowrap">Profile</span>
                  </button>
                  {/* sign out button */}
                  <button
                    onClick={() => signOut(auth)}
                    className="hover:bg-dark-lighten flex items-center gap-1 px-3 py-1 transition duration-300"
                  >
                    <i className="bx bx-log-out text-xl"></i>
                    <span className="whitespace-nowrap">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </ClickAwayListener>
        </div>
      </div>
      {/* open modal info user */}
      <UserInfo isOpened={isUserInfoOpened} setIsOpened={setIsUserInfoOpened} />
      {/* open modal tao video call */}
      {createChatVideoOpened && (
        <CreateChatVideo setIsOpened={setCreateChatVideoOpened} />
      )}
      {/* open modal tao doan chat moi */}
      {createConversationOpened && (
        <CreateConversation setIsOpened={setCreateConversationOpened} />
      )}
    </>
  );
};

export default Account;
