// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser as setReduxUser } from "../redux/features/auth/authSlice";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import { Skeleton } from "@/components/ui/skeleton";

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


  if (isLoading && user === undefined) {
    return (
      <div className="w-full h-screen flex flex-col">
        {/* 1. Navigation Bar Skeleton */}
        <nav className="w-full h-16 border-b px-8 flex items-center justify-between">
          <Skeleton className="h-8 w-32" /> {/* Logo */}
          <div className="flex gap-6">
            <Skeleton className="h-4 w-16 hidden md:block" />
            <Skeleton className="h-4 w-16 hidden md:block" />
            <Skeleton className="h-10 w-24 rounded-full" /> {/* CTA Button */}
          </div>
        </nav>

        {/* 2. Hero Section Skeleton */}
        <main className="flex-1 flex flex-col lg:flex-row w-full items-center justify-center gap-5 mt-10 lg:mt-0 px-4 text-center">
          <div className="flex flex-col items-center gap-3 md:gap-5 xl:gap-7">
            {/* Badge */}
            <Skeleton className="h-6 w-40 rounded-full " />

            {/* Main Headline */}
            <div className="space-y-4  flex flex-col items-center">
              <Skeleton className="h-12 w-[300px] md:w-[600px]" />
              <Skeleton className="h-12 w-[250px] md:w-[450px]" />
            </div>

            {/* Subtext */}
            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="h-4 w-[280px] md:w-[400px]" />
              <Skeleton className="h-4 w-[200px] md:w-[300px]" />
            </div>

            {/* Hero Buttons */}
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-12 w-32 rounded-md" />
              <Skeleton className="h-12 w-32 rounded-md" />
            </div>
          </div>

          {/* 3. Hero Visual/Dashboard Mockup */}
          <div className="w-full max-w-5xl px-4 flex-1">
            <Skeleton className="w-full h-full mih-h-[10vh] md:min-h-[50vh] rounded-t-2xl " />
          </div>
        </main>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthContext);
