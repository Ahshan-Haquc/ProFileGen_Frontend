import React from "react";
import { useSkillsContext } from "@/redux/hooks";
import { useAuthUser } from "@/redux/hooks";
import { useUserCV } from "@/redux/hooks";
import { useUpdateUserSkillsMutation } from "../../../redux/features/skills/skillsApi";

const SaveSkillsButton = () => {
  const { skills } = useSkillsContext();
  const { userCV, setUserCV } = useUserCV();
  const [updateUserSkills] = useUpdateUserSkillsMutation();

  const getCvId = () => {
    if (userCV?._id) {
      return userCV._id;
    }

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("userCV");
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed?._id || "";
        }
      } catch (err) {
        console.error("Failed to parse stored userCV", err);
      }
    }

    return "";
  };

  const handleSave = async () => {
    const cvId = getCvId();
    if (!cvId) {
      alert("Unable to save skills: CV id is missing.");
      return;
    }

    try {
      const data = await updateUserSkills({
        cvId,
        skills,
      }).unwrap();

      alert(data.message);
      setUserCV(data.updatedCV);
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
