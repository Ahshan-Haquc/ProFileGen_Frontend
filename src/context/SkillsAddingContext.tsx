import { createContext, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSkills as setReduxSkills } from "../redux/features/skills/skillsSlice";

export const SkillsContext = createContext<any>(null);

export const SkillsProvider = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.skills.skills);

  const setSkills = (data: any) => {
    dispatch(setReduxSkills(data));
  };

  return (
    <SkillsContext.Provider value={{ skills, setSkills }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkillsContext = () => useContext(SkillsContext);