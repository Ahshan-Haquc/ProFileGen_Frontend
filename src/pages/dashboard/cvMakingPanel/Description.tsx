import React, { useState, useEffect } from "react"; // Import useEffect
import { useAuthUser } from "@/context/AuthContext";
import { useUserCV } from "@/context/UserCVContext";
import { useUpdateUserDescriptionMutation } from "@/redux/features/dashboard/dashboardApi";

const Description = () => {
  const { user } = useAuthUser();
  const { userCV } = useUserCV();
  const [inputValue, setInputValue] = useState("");

  // Use useEffect to set the initial inputValue from userCV?.description
  useEffect(() => {
    if (userCV?.description) {
      setInputValue(userCV.description);
    }
  }, [userCV?.description]); // Dependency array: run when userCV.description changes

  // handleInput to set the input value directly
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const [updateUserDescription] = useUpdateUserDescriptionMutation();

  // submitting in backend
  const submitData = async () => {
    try {
      const data = await updateUserDescription({
        cvId: userCV._id,
        userDescription: inputValue,
      }).unwrap();

      if (data.success) {
        alert("Updated successfully!");
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in my submission:", error); // Use console.error for errors
      alert("Update failed due to a network error.");
    }
  };

  return (
    <div className="p-4 h-full min-w-full flex-grow">
      <div className="text-2xl text-[#210F37] font-bold ">
        <i className="fa-solid fa-square-pen mr-2"></i>About you
      </div>
      <div className="mt-3 w-full flex flex-col flex-wrap gap-3">
        <textarea
          rows={5}
          value={inputValue}
          placeholder="Tell us about yourself..."
          className="h-[200px] w-full border border-[#210F37] rounded-md p-2 text-xl block focus:border-[#ff8757] focus:outline-none"
          onChange={handleInput}
        />

        <button
          className="h-12 w-[200px] text-white bg-[#210F37] hover:bg-[#ff8757] border border-[#210F37] rounded-md p-2 text-xl block transition-colors"
          onClick={submitData}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Description;
