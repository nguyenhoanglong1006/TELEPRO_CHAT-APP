import { useState } from "react";
import { db } from "../../shared/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useStore } from "../../store";

// Search user va hien thi tren sidebar
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<any | null>(null);
  const [err, setErr] = useState(false);

  const currentUser = useStore((state) => state.currentUser);

  // Search user bang displayName (ghi day du)
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  // Nhan enter de tim
  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

  // render UI
  return (
    <>
      <div className="flex flex-1 flex-col items-stretch gap-2 overflow-y-auto border-b-[2px] py-2">
        <div className="flex flex-1 items-center justify-center px-3 pb-3 focus:border-gray-300">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyDown={handleKey}
            type="text"
            placeholder="Search..."
            className="border-lighten bg-lighten text-dark-lighten h-full w-full rounded-lg border p-2 outline-none transition duration-300 focus:border-gray-300"
          />
        </div>
        {err && <span>User unavailable</span>}
        {user && (
          <div className="userChat text-hidden ml-3 items-center">
            <img
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
              src={user.photoURL}
            ></img>
            <div className="text-dark max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
