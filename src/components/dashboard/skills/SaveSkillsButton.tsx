import React from "react";
import { useSkillsContext } from "../../../context/SkillsAddingContext";
import { useAuthUser } from "../../../context/AuthContext";
import { useUserCV } from "../../../context/UserCVContext";

const SaveSkillsButton = () => {
  const { skills } = useSkillsContext();
  const { user } = useAuthUser();
  const { setUserCV } = useUserCV();

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/updateUserSkills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          skills: skills,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setUserCV(data.updatedCV);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error saving skills:", err);
      alert("Skill save failed");
    }
  };

  return (
    <div className="mt-6">
      <button
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg"
        onClick={handleSave}
      >
        Save Selected Skills
      </button>
    </div>
  );
};

export default SaveSkillsButton;
