import React, { useState, useEffect } from "react";
import { useAuthUser } from "../../context/AuthContext";
import deleteProject from "../../controllers/deleteItems"
import { useUserCV } from "../../context/UserCVContext";
import toastShow from "../../utils/toastShow";

const Experience = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();
  const [contactValues, setContactValues] = useState({
    organizationName: "",
    organizationAddress: "",
    joiningDate: "",
    endingDate: "",
    position: "",
    jobDescription: "",
  });

  useEffect(() => {
    console.log("Page updated");
  }, [userCV])

  //handling input
  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setContactValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  //submitting in backend
  const submitData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/updateUserExperience`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cvId: userCV._id,
            organizationName: contactValues.organizationName,
            organizationAddress: contactValues.organizationAddress,
            joiningDate: contactValues.joiningDate,
            endingDate: contactValues.endingDate,
            position: contactValues.position,
            jobDescription: contactValues.jobDescription,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toastShow(data.message, "success");
        setUserCV(data.updatedCV);
      } else {
        toastShow(data.message, "error");
      }
    } catch (error) {
      console.log("Error in my submittion :", error);
      toastShow("Not updated", "error");
    }
  };
  return (
    <div className="p-4 h-full min-w-full ">
      <div className="text-2xl text-blue-700 font-bold ">
        <i className="fas fa-briefcase mr-2"></i>Add Your Experience
      </div>
      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="organizationName"
          onChange={handleInput}
          placeholder="enter your organization name"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
        />
        <input
          type="text"
          name="organizationAddress"
          onChange={handleInput}
          placeholder="enter your organization address"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
        />
        <div className="w-full flex justify-between gap-1">
          <div className="h-fit w-[40%]">
            <p>Joining date</p>
            <input
              type="date"
              name="joiningDate"
              onChange={handleInput}
              id=""
              className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
            />
          </div>
          <div className="h-fit w-[40%]">
            <p>Ending date</p>
            <input
              type="date"
              name="endingDate"
              onChange={handleInput}
              id=""
              className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
            />
          </div>
          <div className="flex justify-center items-center text-xl pt-5">
            <input
              type="checkbox"
              name="endingDate"
              onChange={handleInput}
              value="Present"
              className="h-5 w-5 mr-3"
            />{" "}
            Currently working
          </div>
        </div>
        <select
          name="position"
          onChange={handleInput}
          id=""
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
        >
          <option value="None">Select your position</option>
          <option value="Intern">Intern</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Manager">Manager</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          type="text"
          name="jobDescription"
          onChange={handleInput}
          placeholder="write what you did"
          className="h-[300px] w-full border border-gray-400 rounded-md p-2 text-xl block"
        />

        <button
          className="h-12 w-[200px] text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
          onClick={submitData}
        >
          Update
        </button>
      </div>
      <div className="text-2xl mt-8 text-red-700 font-bold mb-4">
        <i className="fas fa-trash-alt mr-2"></i>Delete Your Work Experience List
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Serial
              </th>
              <th className="w-5/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Organization Name
              </th>
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCV?.experience.map((experience, index) => {
              return (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-50"
                  key={index}
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    {experience.organizationName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    <button
                      className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                      onClick={() => deleteProject(userCV._id, "experience", index, setUserCV)}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Experience;
