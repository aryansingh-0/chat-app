import React from "react";

const Messagebox = ({ message, user, custclass }) => {
  return (
    <div className={`text-wrap  text-zinc-200  flex ${custclass.parent}  p-2`}>
      <div
        className={` max-w-[20vw] max-sm:max-w-[70vw] p-2 rounded-md  bg-zinc-500`}
      >
        <h1 className=" text-[18px] max-sm:text-[14px] font-semibold">
          <span className="text-orange-500 text-semibold capitalize ">
            {user}:
          </span>{" "}
          {message}
        </h1>
      </div>
    </div>
  );
};

export default Messagebox;
