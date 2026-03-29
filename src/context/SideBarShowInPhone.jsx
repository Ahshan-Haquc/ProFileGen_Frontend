import { createContext, useContext, useState } from "react";

export const sideBarContext = createContext()

export const SideBarVisibleInPhoneProvider = ({ children }) => {
    const [isSideBarVisible, setIsSidebarVisible] = useState(true);

    return <sideBarContext.Provider value={{ isSideBarVisible, setIsSidebarVisible }}>{children}</sideBarContext.Provider>
}

export const useSideBarVisible = () => useContext(sideBarContext);