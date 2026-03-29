import React, { useEffect } from "react";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import deleteProject from "../../controllers/deleteItems"

import { useState } from "react";
import toastShow from "../../utils/toastShow";

const Projects = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();
  const [contactValues, setContactValues] = useState({
    projectName: "",
    projectDescription: "",
    projectToolsAndTechnologies: "",
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateUserProjects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId: userCV._id,
          projectName: contactValues.projectName,
          projectDescription: contactValues.projectDescription,
          projectToolsAndTechnologies:
            contactValues.projectToolsAndTechnologies,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUserCV(data.updatedCV);
        toastShow(data.message, "success");
      } else {
        toastShow(data.message, "error");
      }
    } catch (error) {
      console.log("Error in my submittion :", error);
      toastShow("Not updated", "error");
    }
  };

  //delete project
  //defined in controller/deleteItems
  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-blue-700 font-bold ">
        <i className="fas fa-tasks mr-2"></i>Add Your Project
      </div>
      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="projectName"
          onChange={handleInput}
          placeholder="enter your project name"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
        />
        <textarea
          type="text"
          name="projectDescription"
          onChange={handleInput}
          placeholder="write about your project"
          className="h-[300px] w-full border border-gray-400 rounded-md p-2 text-xl block"
        />
        <input
          type="text"
          name="projectToolsAndTechnologies"
          onChange={handleInput}
          placeholder="tools & technologies used , eg: HTML,CSS,JS...."
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
        />
        <div className="flex justify-end">
          <button
            className="h-12 w-[200px] text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
            onClick={submitData}
          >
            <i className="fas fa-plus mr-2"></i>Add
          </button>
        </div>
      </div>
      <div className="text-2xl mt-8 text-red-700 font-bold mb-4">
        <i className="fas fa-trash-alt mr-2"></i>Delete Your Project
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Serial
              </th>
              <th className="w-5/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Project Title
              </th>
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCV?.projects.map((project, index) => {
              return (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-50"
                  key={index}
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    {project.projectName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    <button
                      className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                      onClick={() => deleteProject(userCV._id, "projects", index, setUserCV)}
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

export default Projects;
