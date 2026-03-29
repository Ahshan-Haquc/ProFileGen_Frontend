import React, { useState, useEffect } from "react";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import toastShow from "../../utils/toastShow";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const { user } = useAuthUser();
  const { userCV } = useUserCV();
  const navigate = useNavigate();
  const [contactValues, setContactValues] = useState({
    phoneNumber: "",
    emailId: "",
    linkedInId: "",
    githubId: "",
    portfolioLink: "",
    address: "",
  });

  // Use useEffect to initialize contactValues when userCV changes
  useEffect(() => {
    if (userCV) {
      setContactValues({
        phoneNumber: userCV.phoneNumber || "",
        emailId: userCV.emailId || "",
        linkedInId: userCV.linkedInId || "",
        githubId: userCV.githubId || "",
        portfolioLink: userCV.portfolioLink || "",
        address: userCV.address || "",
      });
    }
  }, [userCV]); // Dependency array: re-run when userCV object changes

  // handling input
  const handleInput = (e) => {
    const { name, value } = e.target; // Destructure name and value from e.target

    setContactValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // submitting in backend
  const submitData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateUserContact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId: userCV._id,
          phoneNumber: contactValues.phoneNumber,
          emailId: contactValues.emailId,
          linkedInId: contactValues.linkedInId,
          githubId: contactValues.githubId,
          portfolioLink: contactValues.portfolioLink,
          address: contactValues.address,
        }),
      });
      if (response.ok) {
        toastShow("Updated successfully!", "success");
        setContactValues({})
        navigate("/home"); // Navigate to dashboard after successful update
      } else {
        toastShow("Update failed. Please try again with filling all fields.", "error");
      }
    } catch (error) {
      console.error("Error in submission:", error); // Use console.error for errors
      toastShow("Update failed due to a network error.", "error");
    }
  };

  return (
    <div className="p-4 h-full w-full">
      <div className="text-2xl text-[#213448] font-bold ">
        <i className="fas fa-align-left mr-2"></i>Contact info
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <input
          type="text"
          value={contactValues.phoneNumber} // Bind value to state
          name="phoneNumber"
          onChange={handleInput}
          placeholder="your phone number"
          className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
        />
        <input
          type="text"
          name="emailId"
          value={contactValues.emailId} // Bind value to state
          onChange={handleInput}
          placeholder="your email"
          className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
        />
        <input
          type="text"
          name="linkedInId"
          value={contactValues.linkedInId} // Bind value to state
          onChange={handleInput}
          placeholder="linkedIn profile link"
          className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
        />
        <input
          type="text"
          name="githubId"
          value={contactValues.githubId} // Bind value to state
          onChange={handleInput}
          placeholder="github link"
          className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
        />
        <input
          type="text"
          name="portfolioLink"
          value={contactValues.portfolioLink} // Bind value to state
          onChange={handleInput}
          placeholder="portfolio link"
          className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
        />
        <input
          type="text"
          name="address"
          value={contactValues.address} // Bind value to state
          onChange={handleInput}
          placeholder="your current address"
          className="h-12 w-[300px] border border-gray-400 rounded-md p-2 text-xl block"
        />
        <button
          className="h-12 w-[200px] mt-5 text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
          onClick={submitData}
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default Contact;
