const Skills = ({ skillTitle, skillNames }) => {
  return (
    <div className="text-white ml-10 my-8">
      <div className="text-2xl font-bold">{skillTitle}</div>
      <div className="pl-[60px] text-xl">
        <ul className="list-disc">
          {skillNames.map((name, idx) => {
            return <li key={idx}>{name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
