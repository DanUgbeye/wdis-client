"use client";
import React, { PropsWithChildren } from "react";
import { UserServerData } from "@/modules/user/user.type";
import { UserStorage } from "@/modules/user/storage";
import { LocalStorage } from "@/global-utils/persistent-storage";
import useAuth from "../hooks/useAuth.hook";
import { UserAPIService } from "@/modules/user/api";
import apiService from "@/modules/api/api";

export interface UserContextProps {
  loading: boolean;
  user: UserServerData | null;
  saveUser: (user: UserServerData | null) => void;
}

export const UserContext = React.createContext<UserContextProps>({
  loading: false,
  user: null,
  saveUser: (user: UserServerData | null) => {},
});

export interface UserContextProviderProps extends PropsWithChildren {}

export function UserContextProvider(props: UserContextProviderProps) {
  const { auth, loading: authLoading } = useAuth();
  const [user, setUser] = React.useState<UserServerData | null>(null);
  const [loading, setLoading] = React.useState(true);

  /** saves user data */
  const saveUser = React.useCallback((user: UserServerData | null) => {
    setLoading(true);
    setUser(user);
    const userStorage = new UserStorage(new LocalStorage());
    userStorage.save(user);
    setLoading(false);
  }, []);

  /** fetch user data from API */
  const fetchUser = React.useCallback(async () => {
    setTimeout(async () => {
      if (!auth || authLoading) return;

      console.log("fetching");
      const userApi = new UserAPIService(apiService);

      try {
        const res = await userApi.getProfile();
        console.log(res, "hellow world");
        saveUser(res);
      } catch (error: any) {
        console.log(apiService.getToken());
        console.log(error);
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* handle auth state change */
  React.useEffect(() => {
    if (!authLoading) {
      setLoading(true);

      if (!auth) {
        saveUser(null);
      } else {
        const userStorage = new UserStorage(new LocalStorage());
        const savedUser = userStorage.get();

        if (!user) {
          fetchUser();
        }

        if (savedUser) {
          setUser(savedUser);
        }
      }

      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading]);

  /* delete any saved user info once auth details is not available */
  React.useEffect(() => {
    if (!auth && !authLoading && user) {
      saveUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, user, authLoading]);

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        saveUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
