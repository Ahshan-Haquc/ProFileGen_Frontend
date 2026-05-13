import React, { useEffect, useState } from "react";
import { useAuthUser } from "@/redux/hooks";
import { useUserCV } from "@/redux/hooks";
import toastShow from "@/utils/toastShow";
import {
  useUpdateUserReferenceMutation,
  useDeleteItemsMutation,
} from "@/redux/features/dashboard/dashboardApi";

const Reference = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();

  const [referenceValues, setReferenceValues] = useState({
    referenceName: "",
    referenceCompany: "",
    referenceEmail: "",
    referencePhone: "",
  });

  useEffect(() => {
    console.log("Reference section updated.");
  }, [userCV]);

  // Handle input fields
  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setReferenceValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  const [updateUserReference] = useUpdateUserReferenceMutation();
  const [deleteItems] = useDeleteItemsMutation();

  // Submit reference to backend
  const submitData = async () => {
    try {
      const data = await updateUserReference({
        cvId: userCV._id,
        referenceName: referenceValues.referenceName,
        referenceCompany: referenceValues.referenceCompany,
        referenceEmail: referenceValues.referenceEmail,
        referencePhone: referenceValues.referencePhone,
      }).unwrap();
      toastShow(data.message, "success");
      setUserCV(data.updatedCV);
    } catch (error) {
      console.log("Error submitting reference:", error);
      toastShow("Not updated", "error");
    }
  };

  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-[#210F37] font-bold ">
        <i className="fas fa-user-check mr-2"></i>Add Your Reference
      </div>

      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="referenceName"
          onChange={handleInput}
          placeholder="Reference Name"
          className="h-12 w-full border border-[#210F37] rounded-md p-2 text-xl focus:border-[#ff8757] focus:outline-none"
        />
        <input
          type="text"
          name="referenceCompany"
          onChange={handleInput}
          placeholder="Company / Organization"
          className="h-12 w-full border border-[#210F37] rounded-md p-2 text-xl focus:border-[#ff8757] focus:outline-none"
        />
        <input
          type="email"
          name="referenceEmail"
          onChange={handleInput}
          placeholder="Reference Email"
          className="h-12 w-full border border-[#210F37] rounded-md p-2 text-xl focus:border-[#ff8757] focus:outline-none"
        />
        <input
          type="text"
          name="referencePhone"
          onChange={handleInput}
          placeholder="Reference Phone Number"
          className="h-12 w-full border border-[#210F37] rounded-md p-2 text-xl focus:border-[#ff8757] focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            className="h-12 w-[200px] text-white bg-[#210F37] hover:bg-[#ff8757] rounded-md text-xl transition-colors"
            onClick={submitData}
          >
            Add
          </button>
        </div>
      </div>

      <div className="text-2xl mt-8 text-red-700 font-bold mb-4">
        <i className="fas fa-trash mr-2"></i>Delete Reference
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-[#210F37]/10 border-b border-gray-300">
              <th className="py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase">
                #
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase">
                Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase">
                Company
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase">
                Email
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase">
                Phone
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-[#210F37] uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCV?.reference?.map((ref, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referenceName}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referenceCompany}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referenceEmail}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referencePhone}
                </td>
                <td className="py-4 px-6 text-sm">
                  <button
                    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={async () => {
                      try {
                        const data = await deleteItems({
                          cvId: userCV._id,
                          pageName: "reference",
                          indexToDelete: index,
                        }).unwrap();
                        if (data.updatedCV) setUserCV(data.updatedCV);
                      } catch (error) {
                        toastShow("Failed to delete reference.", "error");
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

export default Reference;
