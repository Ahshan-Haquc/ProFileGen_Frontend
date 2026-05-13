import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthUser } from "@/redux/hooks";
import { useUserCV } from "@/redux/hooks";
import toastShow from "@/utils/toastShow";
import {
  useUpdateUserProjectsMutation,
  useDeleteItemsMutation,
} from "@/redux/features/dashboard/dashboardApi";

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

  const [updateUserProjects] = useUpdateUserProjectsMutation();
  const [deleteItems] = useDeleteItemsMutation();

  //submitting in backend
  const submitData = async () => {
    try {
      const data = await updateUserProjects({
        cvId: userCV._id,
        projectName: contactValues.projectName,
        projectDescription: contactValues.projectDescription,
        projectToolsAndTechnologies:
          contactValues.projectToolsAndTechnologies,
      }).unwrap();
      setUserCV(data.updatedCV);
      toastShow(data.message, "success");
    } catch (error) {
      console.log("Error in my submittion :", error);
      toastShow("Not updated", "error");
    }
  };

  //delete project
  //defined in controller/deleteItems
  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-[#210F37] font-bold ">
        <i className="fas fa-tasks mr-2"></i>Add Your Project
      </div>
      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="projectName"
          onChange={handleInput}
          placeholder="enter your project name"
          className="h-12 w-full border border-[#210F37] rounded-md p-2 text-xl block focus:border-[#ff8757] focus:outline-none"
        />
        <textarea
          rows={10}
          name="projectDescription"
          onChange={handleInput}
          placeholder="write about your project"
          className="h-[300px] w-full border border-[#210F37] rounded-md p-2 text-xl block focus:border-[#ff8757] focus:outline-none"
        />
        <input
          type="text"
          name="projectToolsAndTechnologies"
          onChange={handleInput}
          placeholder="tools & technologies used , eg: HTML,CSS,JS...."
          className="h-12 w-full border border-[#210F37] rounded-md p-2 text-xl block focus:border-[#ff8757] focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            className="h-12 w-[200px] text-white bg-[#210F37] hover:bg-[#ff8757] border border-[#210F37] rounded-md p-2 text-xl block transition-colors"
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
            <tr className="bg-[#210F37]/10 border-b border-gray-300">
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase tracking-wider">
                Serial
              </th>
              <th className="w-5/7 py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase tracking-wider">
                Project Title
              </th>
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase tracking-wider">
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
                      onClick={async () => {
                      try {
                        const data = await deleteItems({
                          cvId: userCV._id,
                          pageName: "projects",
                          indexToDelete: index,
                        }).unwrap();
                        if (data.updatedCV) setUserCV(data.updatedCV);
                      } catch (error) {
                        toastShow("Failed to delete project.", "error");
                      }
                    }}
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
