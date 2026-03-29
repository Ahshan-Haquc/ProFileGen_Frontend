import React from "react";

const WorkExperience = (props) => {
  return (
    <div className="mt-8 ml-8">
      <div className="flex justify-between">
        <div className="">
          <div className="text-lg">{props.position}</div>
          <div className="text-3xl font-bold">{props.organizationName}</div>
          <div className="text-sm text-gray-500">
            {props.organizationLocation}
          </div>
        </div>
        <div className="min-w-[200px] text-right pr-2">
          {props.joiningDate} to {props.endingDate}
        </div>
      </div>
      <div className="mt-4 text-2xl">{props.description}</div>
    </div>
  );
};

export default WorkExperience;
