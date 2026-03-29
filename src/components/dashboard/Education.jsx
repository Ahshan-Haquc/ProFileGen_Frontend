import React, { useState, useEffect } from "react";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import deleteProject from "../../controllers/deleteItems";
import toastShow from "../../utils/toastShow";

const Education = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();

  const [contactValues, setContactValues] = useState({
    educationQualification: "",
    educationInstitutionName: "",
    startingDate: "",
    endingDate: "",
  });

  useEffect(() => {
    console.log("Education updated cv :", userCV);
  }, [userCV]);

  // handle input
  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setContactValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  // submit to backend
  const submitData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateUserEducation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId: userCV._id,
          educationQualification: contactValues.educationQualification,
          educationInstitutionName: contactValues.educationInstitutionName,
          startingDate: contactValues.startingDate,
          endingDate: contactValues.endingDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toastShow(data.message, "success");
        setUserCV(data.updatedCV);
        setContactValues({
          educationQualification: "",
          educationInstitutionName: "",
          startingDate: "",
          endingDate: "",
        });
      } else {
        toastShow(data.message, "error");
      }
    } catch (error) {
      console.log("Error in submission:", error);
      toastShow("Not updated", "error");
    }
  };

  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-blue-700 font-bold mb-3">
        <i className="fas fa-graduation-cap mr-2"></i>Education
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="educationQualification"
          value={contactValues.educationQualification}
          onChange={handleInput}
          placeholder="Enter your qualification"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
        />

        <input
          type="text"
          name="educationInstitutionName"
          value={contactValues.educationInstitutionName}
          onChange={handleInput}
          placeholder="Enter your institution name"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
        />

        <div className="flex justify-between gap-2">
          <div className="w-1/2">
            <label className="block mb-1">Starting Date</label>
            <input
              type="date"
              name="startingDate"
              value={contactValues.startingDate}
              onChange={handleInput}
              className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1">Ending Date</label>
            <input
              type="date"
              name="endingDate"
              value={contactValues.endingDate}
              onChange={handleInput}
              className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={submitData}
            className="h-12 w-[200px] text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl"
          >
            <i className="fas fa-plus mr-2"></i>Add
          </button>
        </div>
      </div>

      <div className="text-2xl mt-8 text-red-700 font-bold mb-4">
        <i className="fas fa-trash-alt mr-2"></i>Delete Your Education
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Serial
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Qualification
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Institution
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCV?.education?.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-700">{index + 1}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.educationQualification}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.educationInstitutionName}</td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {item.startingDate} to {item.endingDate}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <button
                    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() =>
                      deleteProject(userCV._id, "education", index, setUserCV)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Education;
