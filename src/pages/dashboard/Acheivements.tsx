import React, { useEffect, useState } from "react";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import toastShow from "../../utils/toastShow";
import {
  useUpdateUserAchievementMutation,
  useDeleteItemsMutation,
} from "../../redux/features/dashboard/dashboardApi";

const Acheivements = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("Achievements updated cv : ", userCV);
  }, [userCV]);

  // handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const [updateUserAchievement] = useUpdateUserAchievementMutation();
  const [deleteItems] = useDeleteItemsMutation();

  // submit achievement
  const submitData = async () => {
    try {
      const data = await updateUserAchievement({
        cvId: userCV._id,
        acheivement: inputValue,
      }).unwrap();

      toastShow(data.message, "success");
      setUserCV(data.updatedCV);
      setInputValue("");
    } catch (error) {
      console.log("Error in achievement submission:", error);
      toastShow("Not updated", "error");
    }
  };

  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-blue-700 font-bold">
        <i className="fas fa-trophy mr-2"></i>Add Your Achievement
      </div>

      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="acheivement"
          value={inputValue}
          onChange={handleInput}
          placeholder="Enter your achievement"
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
        <i className="fas fa-trash-alt mr-2"></i>Delete Your Achievement
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Serial
              </th>
              <th className="w-5/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Achievement
              </th>
              <th className="w-1/7 py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCV?.achievement?.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                  {item}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                  <button
                    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={async () => {
                      try {
                        const data = await deleteItems({
                          cvId: userCV._id,
                          pageName: "achievement",
                          indexToDelete: index,
                        }).unwrap();
                        if (data.updatedCV) setUserCV(data.updatedCV);
                      } catch (error) {
                        toastShow("Failed to delete achievement.", "error");
                      }
                    }}
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

export default Acheivements;
