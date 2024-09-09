import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import socketIo from "socket.io-client";
import { username } from "../join/join";
import Messagebox from "../message/Messagebox";

const EndPoint = "https://char-r.onrender.com/";
let socket;
const Chat = () => {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);

  const send = () => {
    const msg = document.getElementById("msg").value;
    socket.emit("message", msg);
    document.getElementById("msg").value = "";
    setname(""); // Clear input after sending
  };

  useEffect(() => {
    socket = socketIo(EndPoint, { transports: ["websocket"] });

    socket.on("connect", () => {
      setid(socket.id);
    });
    socket.emit("joined", { username });

    socket.on("welcome", (data) => {
      setmessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("joineduser", (data) => {
      setmessages((prevMessages) => [...prevMessages, data]);
      alert(`${data.user} has joined the group`);
    });

    socket.on("leave", (data) => {
      setmessages((prevMessages) => [...prevMessages, data]);
      alert(`${data.user} has left the group`);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setmessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div>
      <div className="w-full flex items-center justify-center h-screen bg-zinc-900 m-auto">
        <div className="w-1/2  max-sm:w-screen max-sm:h-full  max-sm:rounded-none rounded-2xl  overflow-hidden md:w-[80vw] h-[80vh] flex flex-col ">
          <div className="chat-bar relative w-[100%] h-[10%] bg-zinc-500">
            <h1 className="text-center max-sm:pt-5  uppercase font-semibold text-orange-500 ">
              {username}
            </h1>
          </div>

          <ReactScrollToBottom className="chatb relative h-[80%] w-[100%] flex flex-col  bg-zinc-700">
            {messages.map((item, index) => {
              return (
                <Messagebox
                  message={item.message}
                  custclass={
                    item.id === id
                      ? { parent: "justify-end", child: " bg-teal-300" }
                      : { parent: "justify-start", child: " bg-teal-500" }
                  }
                  user={item.id === id ? "you" : item.user}
                />
              );
            })}
          </ReactScrollToBottom>

          <div className="chat-bar w-[100%] h-[10%]">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter" && name !== "") send();
              }}
              onChange={(e) => setname(e.target.value)}
              value={name}
              className="w-[80%] focus:outline-none focus:ring  text-zinc-200 bg-zinc-500 p-2 h-[100%]"
              type="text"
              id="msg"
            />
            <button
              onClick={send}
              disabled={name === ""} // Disable if input is empty
              className={`w-[20%] border-solid border-l-[1.5px] hover:text-orange-500  border-zinc-200 hover:text-ls text-zinc-200 font-medium h-[100%] ${
                name === "" ? "bg-gray-500 cursor-not-allowed" : "bg-gray-600"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
