import React, { useRef, useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserCV } from "../context/UserCVContext";
import Loading from "../commonComponents/Loading";
import { loadingOnPageLoad } from "../controllers/loadingOnPageLoad";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";

const ViewCV = () => {
  const [loading, setLoading] = useState(true);
  const { userCV, setUserCV } = useUserCV();
  useEffect(() => {
    document.title = "Modern CV";
  }, [userCV]);

  const pageRef = useRef(null);
  const handleScreenshot = async () => {
    if (!pageRef.current) return;

    try {
      const dataUrl = await toPng(pageRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "screenshot.png";
      link.click();
    } catch (err) {
      console.error("Screenshot failed", err);
    }
  };

  // for loading when someone first access in this page 
  loadingOnPageLoad(setLoading);
  return (
    <>
      {/* loading showing */}
      {loading && <Loading loadingMessage="Generating CV..." />}

      <div className="fixed bottom-4 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center" onClick={handleScreenshot}>
        <i className="fa-solid fa-download"></i>
      </div>
      {/* click to go dashboard again  */}
      <NavLink
        to={"/"}
        className="fixed bottom-20 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </NavLink>
      <div className=" p-[100px] mx-auto bg-gray-100">
        <div ref={pageRef} className="flex">
          <LeftSide />
          <RightSide />
        </div>
      </div>
    </>
  );
};

export default ViewCV;
