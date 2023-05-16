import { FC } from "react";
import SideBar from "../components/Home/SideBar";
import Account from "../components/Home/Account";

const Home: FC = () => {
  return (
    <div className="flex">
      {/* Left-bar with sign out button*/}
      <Account />

      {/* Message list */}
      <SideBar />

      {/* Chat view */}
      <div className="bg-lighten flex-grow flex-col items-center justify-center gap-3 md:!flex">
        <div className="flex justify-between">
          <div className="bg-secondary mt-9 flex items-center gap-2 rounded-full p-3">
            <h1 className="text-light text-center text-xl">
              Select a conversation to start chatting
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
