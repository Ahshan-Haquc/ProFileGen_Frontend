import React, { useState } from "react";
import { useUserCV } from "../../context/UserCVContext";
import { Trash2, Plus } from "lucide-react"; // optional, use heroicons/lucide if available
import toastShow from "../../utils/toastShow";

const AddSection = () => {
  const { userCV, setUserCV } = useUserCV();
  const [formValue, setFormValue] = useState("");
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [newContentInput, setNewContentInput] = useState("");

  const handleInput = (e) => setFormValue(e.target.value);
  const handleContentInput = (e) => setNewContentInput(e.target.value);

  const submitData = async () => {
    if (!formValue.trim()) return alert("Section name required");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/addNewSection`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId: userCV._id, sectionName: formValue }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserCV(data.updatedCV);
        setFormValue("");
        toastShow(data.message, "success");
      } else alert(data.error);
    } catch (err) {
      console.error(err);
      alert("Error adding section");
    }
  };

  const deleteSection = async (index) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteSection`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvId: userCV._id, sectionIndex: index }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setUserCV(data.updatedCV);
        setSelectedSectionIndex(null);
      } else {
        alert(data.error || "Failed to delete section");
      }
    } catch (err) {
      console.error("Error deleting section:", err);
      alert("Server error");
    }
  };

  const submitSectionValue = async (index) => {
    if (!newContentInput.trim()) return alert("Text is empty");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/addSectionValue`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId: userCV._id, sectionIndex: index, newValue: newContentInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserCV(data.updatedCV);
        setNewContentInput("");
        alert(data.message);
      } else alert(data.error);
    } catch (err) {
      console.error(err);
      alert("Error adding content");
    }
  };

  const deleteSectionValue = async (sectionIndex, valueIndex) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/deleteSectionValue`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId: userCV._id, sectionIndex, valueIndex }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserCV(data.updatedCV);
        alert(data.message);
      } else alert(data.error);
    } catch (err) {
      console.error(err);
      alert("Error deleting content");
    }
  };

  return (
    <div className="p-6 min-w-full max-w-4xl ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Custom Sections</h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="New section name"
          value={formValue}
          onChange={handleInput}
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={submitData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus className="inline-block w-4 h-4 mr-1" /> Add
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {userCV?.otherSection?.map((section, index) => (
          <div
            key={index}
            className={`relative border p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all ${selectedSectionIndex === index ? "border-blue-600" : "border-gray-200"
              }`}
            onClick={() =>
              setSelectedSectionIndex(selectedSectionIndex === index ? null : index)
            }
          >
            <div className="text-lg font-semibold text-gray-800">{section.sectionName}</div>
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                deleteSection(index);
              }}
              title="Delete Section"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {selectedSectionIndex !== null && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            Add / Delete content to your "{userCV.otherSection[selectedSectionIndex].sectionName}" section
          </h3>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add content"
              value={newContentInput}
              onChange={handleContentInput}
              className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <button
              onClick={() => submitSectionValue(selectedSectionIndex)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {userCV.otherSection[selectedSectionIndex].sectionValues.map((val, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span>{val}</span>
                <button
                  onClick={() => deleteSectionValue(selectedSectionIndex, idx)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <i className="fa-solid fa-square-xmark hover:scale-110 "></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddSection;
