import React from "react";

const ContactText = (props) => {
  return (
    <div className="text-white text-xl flex items-center gap-5">
      <div className="h-3 w-3  ">
        <i className={`fa-solid ${props.logoName}`}></i>
      </div>
      <div className="mt-3">{props.text}</div>
    </div>
  );
};

export default ContactText;
