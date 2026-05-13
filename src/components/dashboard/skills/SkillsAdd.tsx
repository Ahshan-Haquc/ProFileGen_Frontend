import { useSkillsContext } from "@/redux/hooks";

const SkillsAdd = ({ name, identifier, num, category }) => {
  const { skills, setSkills } = useSkillsContext();

  const handleInput = (e) => {
    const isChecked = e.target.checked;
    const categoryName = e.target.dataset.categoryname;
    const value = e.target.value;

    const currentCategorySkills: string[] = (skills[categoryName] as string[]) || [];

    if (isChecked) {
      if (!currentCategorySkills.includes(value)) {
        setSkills({
          ...skills,
          [categoryName]: [...currentCategorySkills, value],
        });
      }
    } else {
      setSkills({
        ...skills,
        [categoryName]: currentCategorySkills.filter((skill) => skill !== value),
      });
    }
  };

  return (
    <div className="h-8 w-fit p-2 border border-[#210F37]/50 rounded-lg flex items-center gap-2 hover:border-[#ff8757] transition-colors">
      <input
        type="checkbox"
        id={identifier + num}
        name={identifier + num}
        data-categoryname={category}
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