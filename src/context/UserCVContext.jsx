import React, { useState, useEffect, createContext, useContext } from "react";

export const CVcontext = createContext();

export const CVprovider = ({ children }) => {
  const [userCV, setUserCV] = useState(() => { //function means if i reload page then userCV value will not lost, it will store in localstorage and then again will assign that value in userCV
    const savedCV = localStorage.getItem("userCV");
    return savedCV ? JSON.parse(savedCV) : null;
  });

  useEffect(() => {
    if (userCV) {
      localStorage.setItem("userCV", JSON.stringify(userCV));
    }
  }, [userCV]);

  return (
    <CVcontext.Provider value={{ userCV, setUserCV }}>
      {children}
    </CVcontext.Provider>
  );
};

export const useUserCV = () => useContext(CVcontext);
