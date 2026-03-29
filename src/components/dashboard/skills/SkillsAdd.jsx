import { useSkillsContext } from "../../../context/SkillsAddingContext";

const SkillsAdd = ({ name, identifier, num, category }) => {
  const { skills, setSkills } = useSkillsContext();

  const handleInput = (e) => {
    const isChecked = e.target.checked;
    const categoryName = e.target.getAttribute("categoryname");
    const value = e.target.value;

    setSkills((prev) => {
      const currentCategorySkills = prev[categoryName] || [];

      if (isChecked) {
        // Add only if not already present
        if (!currentCategorySkills.includes(value)) {
          return {
            ...prev,
            [categoryName]: [...currentCategorySkills, value],
          };
        }
      } else {
        // Remove the unchecked value
        return {
          ...prev,
          [categoryName]: currentCategorySkills.filter((skill) => skill !== value),
        };
      }

      return prev;
    });
  };

  return (
    <div className="h-8 w-fit p-2 border border-green-200 rounded-lg flex items-center gap-2">
      <input
        type="checkbox"
        id={identifier + num}
        name={identifier + num}
        categoryname={category}
        value={name}
        onChange={handleInput}
      />
      <label htmlFor={identifier + num} className="text-lg">
        {name}
      </label>
    </div>
  );
};

export default SkillsAdd;