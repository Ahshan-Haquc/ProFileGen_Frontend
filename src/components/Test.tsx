import React from "react";

const Test = () => {
  return (
    <div>
      {/* basic info */}
      <div className="p-4">
        <div className="text-2xl text-[#213448] font-bold ">Basic info</div>
        <div className="mt-3 flex gap-3">
          <input
            type="text"
            placeholder="enter your name"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
          <input
            type="text"
            placeholder="enter your profession"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
          <label className="flex items-center gap-3 h-12 w-[170px] border border-gray-500 rounded-md px-4 text-xl cursor-pointer bg-gray-600 hover:bg-gray-100">
            <i className="fas fa-upload text-white"></i>
            <span className="text-gray-700 text-white">Choose file</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => console.log(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      {/* contact info */}
      <div className="p-4">
        <div className="text-2xl text-[#213448] font-bold ">Contact info</div>
        <div className="mt-3 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="your phone number"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
          <input
            type="text"
            placeholder="your email"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
          <input
            type="text"
            placeholder="linkedIn profile link"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
          <input
            type="text"
            placeholder="github link"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
          <input
            type="text"
            placeholder="portfolio link"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
          <input
            type="text"
            placeholder="your current address"
            className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
          />
        </div>
      </div>
      {/* add skill */}
      <div className="p-4">
        <div className="text-2xl text-[#213448] font-bold ">Skills info</div>
        <button className="h-12 w-[150px] mt-5 border border-gray-400 rounded-md p-2 text-xl">
          <i class="fa-solid fa-plus"></i> Add Skill
        </button>
      </div>
    </div>
  );
};

export default Test;
