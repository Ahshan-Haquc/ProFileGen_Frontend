import React from "react";
import { useSkillsContext } from "../../../context/SkillsAddingContext";
import { useAuthUser } from "../../../context/AuthContext";
import { useUserCV } from "../../../context/UserCVContext";
import { useUpdateUserSkillsMutation } from "../../../redux/features/skills/skillsApi";

const SaveSkillsButton = () => {
  const { skills } = useSkillsContext();
  const { userCV, setUserCV } = useUserCV();
  const [updateUserSkills] = useUpdateUserSkillsMutation();

  const handleSave = async () => {
    try {
      const data = await updateUserSkills({
        cvId: userCV._id,
        skills: skills,
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
