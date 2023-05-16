import { FC, useState } from "react";
import {
  DEFAULT_AVATAR,
  IMAGE_PROXY,
  THEMES,
  UNKNOWN,
} from "../../shared/constants";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Spin from "react-cssfx-loading/src/Spin";
import { db } from "../../shared/firebase";
import { useCollectionQuery } from "../../hooks/useCollectionQuery";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import Search from "./Search";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

interface CreateChatVideoProps {
  setIsOpened: (value: boolean) => void;
}

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDFEcBp32WLJM8Ebs-sA8mzBqqStnXhACk",
  authDomain: "cnm-chat-app.firebaseapp.com",
  projectId: "cnm-chat-app",
  storageBucket: "cnm-chat-app.appspot.com",
  messagingSenderId: "226728852597",
  appId: "1:226728852597:web:bfa63438cd49cffc208c3c",
});

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

// Export firestore incase we need to access it directly
export const firestore = getFirestore();

// lay tat ca user hien thi ra list trong modal
const CreateChatVideo: FC<CreateChatVideoProps> = ({ setIsOpened }) => {
  const { data, error, loading } = useCollectionQuery(
    "video",
    collection(db, "calls")
  );

  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  const currentUser = useStore((state) => state.currentUser);

  const [selected, setSelected] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleToggle = (uid: string) => {
    if (selected.includes(uid)) {
      setSelected(selected.filter((item) => item !== uid));
    } else {
      setSelected([...selected, uid]);
    }
  };

  // tao conversation moi bang Id cua user duoc chon bang checkbox
  const handleCreateChatVideo = async () => {
    setIsCreating(true);

    const sorted = [...selected, currentUser?.uid].sort();

    const q = query(collection(db, "calls"), where("users", "==", sorted));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const created = await addDoc(collection(db, "calls"), {
        users: sorted,
        group:
          sorted.length > 2
            ? {
                admins: [currentUser?.uid],
                groupName: null,
                groupImage: null,
              }
            : {},
        updatedAt: serverTimestamp(),
        seen: {},
        theme: THEMES[0],
      });

      setIsCreating(false);

      setIsOpened(false);

      // tao id conversation moi tren firebase
      navigate(`/${created.id}`);
    } else {
      setIsOpened(false);

      navigate(`/${querySnapshot.docs[0].id}`);

      setIsCreating(false);
    }
  };

  // Render UI
  return (
    <div
      onClick={() => setIsOpened(false)}
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-light mx-3 w-full max-w-[500px] overflow-hidden rounded-lg"
      >
        <div className="border-lighten flex items-center justify-between border-b py-3 px-3">
          <div className="flex-1"></div>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-dark whitespace-nowrap text-center text-2xl">
              New Video Chat
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <button
              onClick={() => setIsOpened(false)}
              className="bg-light flex h-8 w-8 items-center justify-center rounded-full"
            >
              <i className="bx bx-x text-dark text-2xl"></i>
            </button>
          </div>
        </div>
        <Search />
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Spin color="#0D90F3" />
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-dark-lighten text-center">
              Something went wrong
            </p>
          </div>
        ) : (
          <>
            {isCreating && (
              <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]">
                <Spin color="#0D90F3" />
              </div>
            )}
            <div className="flex h-96 flex-col items-stretch gap-2 overflow-y-auto py-2">
              {data?.docs
                .filter((doc) => doc.data().uid !== currentUser?.uid)
                .map((doc) => (
                  <div
                    key={doc.data().uid}
                    onClick={() => handleToggle(doc.data().uid)}
                    className="hover:bg-lighten flex cursor-pointer items-center gap-2 px-5 py-2 transition"
                  >
                    <input
                      className="flex-shrink-0 cursor-pointer"
                      type="checkbox"
                      checked={selected.includes(doc.data().uid)}
                      readOnly
                    />
                    <img
                      className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                      src={
                        doc.data()?.photoURL
                          ? IMAGE_PROXY(doc.data().photoURL)
                          : DEFAULT_AVATAR
                      }
                      alt=""
                    />
                    <p className="text-dark-lighten">
                      {doc.data().displayName
                        ? doc.data().displayName
                        : UNKNOWN}
                    </p>
                  </div>
                ))}
            </div>
            <div className="border-lighten flex justify-end border-t p-3">
              <button
                disabled={selected.length === 0}
                onClick={handleCreateChatVideo}
                className="bg-lighten text-dark-lighten rounded-lg py-2 px-3 transition duration-300 hover:brightness-125 disabled:!brightness-[80%]"
              >
                Start conversation
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateChatVideo;
