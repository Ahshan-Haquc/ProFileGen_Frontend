import React, { useState } from "react";
import SkillsAdd from "./SkillsAdd";
import { useSkillsContext } from "../../../context/SkillsAddingContext";

const SkillsAddByCategory = ({ category, values }) => {
  const [inputBoxShowingStatus, setInputBoxShowingStatus] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const { skills, setSkills } = useSkillsContext();

  const showNewInputForAddSkill = () => {
    setInputBoxShowingStatus(!inputBoxShowingStatus);
  };

  // handle manual skill input change
  const handleNewSkillInput = (e) => {
    setNewSkill(e.target.value);
  };

  // Add manually typed skill to context
  const AddNewSkill = () => {
    if (!newSkill.trim()) {
      alert("Skill name cannot be empty."); // Provide user feedback
      return;
    }

    setSkills((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newSkill.trim()],
    }));
    alert("Skill added successfully!"); // More descriptive alert

    setNewSkill(""); // clear input field
    setInputBoxShowingStatus(false); // Optionally hide the input box after adding
  };

  return (
    <div>
      <div className="mt-4 text-lg p-1 bg-gray-100">
        <i className="fa-solid fa-list"></i> {category}
      </div>
      <div className="py-3 flex flex-wrap gap-3">
        {values.map((skillName, index) => {
          let number = index + 1;
          return (
            <SkillsAdd
              category={category}
              name={skillName}
              identifier={category}
              num={number}
              key={index}
            />
          );
        })}
      </div>

      <button
        className="h-fit w-fit py-1 px-3 bg-black text-white rounded-md hover:bg-gray-600"
        onClick={showNewInputForAddSkill}
      >
        {inputBoxShowingStatus ? (
          <i className="fa-solid fa-minus"></i>
        ) : (
          <i className="fa-solid fa-plus"></i>
        )}
        <span className="ml-2">
          {inputBoxShowingStatus ? "Hide" : "Add more"}
        </span>
      </button>

      {/* Animated show/hide for the new skill input box */}
      <div
        className={`
          flex items-center mt-2
          overflow-hidden transition-all duration-800 ease-in-out
          ${inputBoxShowingStatus ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <input
          type="text"
          value={newSkill}
          onChange={handleNewSkillInput}
          className="h-8 w-fit p-2 border border-gray-700 rounded-lg"
          placeholder="New skill name" // Added placeholder for better UX
        />
        <button
          className="h-fit w-fit ml-2 py-1 px-3 bg-green-400 text-white rounded-md hover:bg-gray-600"
          onClick={AddNewSkill}
        >
          <i className="fa-solid fa-plus"></i>
          <span className="ml-2">Add</span>
        </button>
      </div>
    </div>
  );
};

export default SkillsAddByCategory;