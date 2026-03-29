import React from "react";

const Headings = (props) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${
          props.pageName === "rightSide" ? "text-[#213448]" : "text-white"
        } text-4xl font-bold pb-2 text-nowrap`}
      >
        {props.title}
      </div>
      <div className="h-[2px] w-full mx-2 bg-blue-400"></div>
    </div>
  );
};

export default Headings;
