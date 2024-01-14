import { Fragment } from "react";
import Client from "./Client";
import { useNavigate } from "react-router-dom";

import { CopyIcon, LogoutIcon } from "../assets/svgIcons";

export default function AsideBar({ copyRoomId, clients }) {
  const reactNavigator = useNavigate();
  function leaveRoom() {
    reactNavigator("/");
  }

  return (
    <>
      <nav className="flex justify-between p-2">
        <div className="flex gap-2 items-center">
          <h4 className="text-sm">Connected User(s): </h4>
          {clients?.map((client, index) => (
            <Fragment key={index}>
              <Client username={client.username} index={index} />
            </Fragment>
          ))}
        </div>
        <button
          className="bg-green-600 h-7 rounded px-2 text-sm flex items-center gap-2 active:bg-green-400 hover:bg-green-500 transition-all duration-300"
          onClick={copyRoomId}
        >
          <CopyIcon /> Copy Room ID
        </button>
        <button
          className="bg-red-500 outline-none rounded text-sm h-7 px-3 flex items-center gap-1 absolute bottom-2 right-2 shadow"
          onClick={leaveRoom}
        >
          Leave <LogoutIcon />
        </button>
      </nav>
    </>
  );
}
