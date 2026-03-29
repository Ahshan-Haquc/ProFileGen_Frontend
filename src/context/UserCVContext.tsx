import React, { createContext, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserCV as setReduxUserCV } from "../redux/features/cv/cvSlice";

export const CVcontext = createContext<any>(null);

export const CVprovider = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const userCV = useAppSelector((state) => state.cv.userCV);

  const setUserCV = (data: any) => {
    dispatch(setReduxUserCV(data));
  };

  return (
    <CVcontext.Provider value={{ userCV, setUserCV }}>
      {children}
    </CVcontext.Provider>
  );
};

export const useUserCV = () => useContext(CVcontext);
