import React, { useState, useEffect } from "react"; // Import useEffect
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";

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

  // submitting in backend
  const submitData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/updateUserDescription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cvId: userCV._id,
            userDescription: inputValue, // Send the current state value
          }),
        }
      );
      if (response.ok) {
        alert("Updated successfully!"); // Corrected typo
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
      <div className="text-2xl text-[#213448] font-bold ">
        <i className="fa-solid fa-square-pen mr-2"></i>About you
      </div>
      <div className="mt-3 w-full flex flex-col flex-wrap gap-3">
        <textarea
          type="text"
          value={inputValue} // Use 'value' instead of 'defaultValue'
          placeholder="Tell us about yourself..." // Good practice to have a general placeholder
          className="h-[200px] w-full border border-gray-400 rounded-md p-2 text-xl block"
          onChange={handleInput}
        />

        <button
          className="h-12 w-[200px] text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
          onClick={submitData}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Description;
