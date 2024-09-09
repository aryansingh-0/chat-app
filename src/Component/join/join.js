import React, { useState } from "react";
import { Link } from "react-router-dom";
let username;
function Join() {
  const [name, setname] = useState("");
  const sendUser = () => {
    username = document.getElementById("username").value;
    setname(username);
    document.getElementById("username").value = "";
  };
  return (
    <div className="w-full h-screen bg-zinc-800 text-white">
      <div className="login text-center">
        <h1 className="text-[5vw] py-[2vmax] tracking-tight font-bold leading-[4vmax] ">
          Welcome to <br /> the Secret world !
        </h1>
      </div>
      <div className="login flex flex-col items-center justify-evenly mt-[5vmax] h-[40vh]">
        <div className="container uppercase text-center">
          <h1 className="text-red-300 text-[3vw] font-semibold ">Log-in</h1>
        </div>
        <div className="input text-black ">
          <input
            onChange={(e) => setname(e.target.value)} // Update state directly
            type="text"
            placeholder="Enter your name "
            className=" border-none text-center rounded-md"
            id="username"
          />
        </div>
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/chat"
        >
          <div
            onClick={sendUser}
            className="w-[10vw] duration-[0.5s] hover:bg-green-200 rounded-sm -mt-[5vh] font-medium uppercase text-black text-center bg-green-300"
          >
            <h1>Login</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Join;
export { username };
