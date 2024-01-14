import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ACTIONS from "../Actions";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import AsideBar from "../components/Navbar";
import ConsolePanel from "../components/ConsolePanel";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);

  const [clients, setClients] = useState([]);
  const [consoleCode, setConsoleCode] = useState("");

  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", err => handleErrors(err));
      socketRef.current.on("connect_failed", err => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients(prev => {
          return prev.filter(client => client.socketId !== socketId);
        });
      });
    };

    init();
    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, [roomId]);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  const handleGetValue = code => {
    setConsoleCode(code)
    codeRef.current = code;
  };
  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="text-gray-100 overflow-hidden">
      <AsideBar copyRoomId={copyRoomId} clients={clients} />
      <div className="max-w-full flex ">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={handleGetValue}
        />
        <ConsolePanel consoleCode={consoleCode} />
      </div>
    </div>
  );
};

export default EditorPage;
