import React, { useState, useEffect } from "react"; // Import useEffect
import { useAuthUser } from "@/redux/hooks";
import { useUserCV } from "@/redux/hooks";
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

  const [updateUserDescription, { isLoading }] = useUpdateUserDescriptionMutation();

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
          rows={15}
          value={inputValue}
          placeholder="Tell us about yourself..."
          className="w-full h-50  p-5 border border-gray-200 rounded-2xl text-lg focus:border-[#ff8757] focus:ring-4 focus:ring-[#ff8757]/10 outline-none transition-all"
          onChange={handleInput}
        />

        <button
          className="h-12 w-[200px] text-white bg-[#210F37] hover:bg-[#ff8757] border border-[#210F37] rounded-md p-2 text-xl block transition-colors"
          onClick={submitData}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Description;
