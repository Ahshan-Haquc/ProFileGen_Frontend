// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser as setReduxUser } from "../redux/features/auth/authSlice";
import { useGetMeQuery } from "../redux/features/auth/authApi";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  
  // RTK Query will automatically fetch on mount
  const { isLoading, error } = useGetMeQuery();

  const setUser = (data: any) => {
    dispatch(setReduxUser(data));
  };

  useEffect(() => {
    if (error) {
      dispatch(setReduxUser(null));
    }
  }, [error, dispatch]);

  if (isLoading && user === undefined) return <div>Loading auth...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthContext);
