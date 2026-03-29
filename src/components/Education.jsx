import React from "react";

const Education = (props) => {
  return (
    <div className="ml-8 mt-6">
      <div className="text-3xl font-bold">{props.department}</div>
      <div className="text-2xl">{props.institution}</div>
      <p>
        {props.startingDate} to {props.endingDate}
      </p>
    </div>
  );
};

export default Education;
