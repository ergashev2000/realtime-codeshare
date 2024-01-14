import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = e => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Email & Username is required");
      return;
    }
    console.log(roomId);
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = e => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center text-gray-100">
      <div className="max-w-md rounded-xl w-full h-fit flex flex-col px-8 py-6 bg-[#1E1E1E]">
        <h4 className="text-lg font-semibold mb-2">Paste invitation Room ID</h4>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="rounded px-3 py-1.5 h-10 bg-transparent border border-gray-200 outline-blue-500"
            placeholder="Enter Room ID"
            onChange={e => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="rounded px-3 py-1.5 h-10 bg-transparent border border-gray-200 outline-blue-500"
            placeholder="Your Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <div className="flex gap-2 items-center justify-between">
            <button
              className="bg-[#2D2D2D] w-1/2 px-5 h-10 text-sm  border hover:border-gray-600 border-transparent rounded transition duration-300 active:bg-gray-600"
              onClick={joinRoom}
            >
              Join Room
            </button>
            <button
              className="bg-[#2D2D2D] w-1/2 px-5 h-10 text-sm  border hover:border-gray-600 border-transparent rounded transition duration-300 active:bg-gray-600"
              onClick={createNewRoom}
            >
              Create Room
            </button>
          </div>
          <h4 className="text-sm text-center">
            Created by{" "}
            <Link
              to={"https://t.me/islomjon5747"}
              target="_blank"
              className="text-blue-800 font-semibold"
            >
              Islomjon
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
