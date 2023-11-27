"use client";
import React, { PropsWithChildren } from "react";
import { toast } from "react-toastify";
import { AuthServerData } from "@/modules/user/user.type";
import apiService from "@/modules/api/api";
import { AuthStorage } from "@/modules/user/storage";
import { LocalStorage } from "@/global-utils/persistent-storage";

export interface AuthContextProps {
  loading: boolean;
  auth: AuthServerData | null;
  saveAuth: (user: AuthServerData) => void;
  authExpired(latestAuth?: AuthServerData): boolean;
  logout: (message?: string | null, showMessage?: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  loading: false,
  auth: null,
  saveAuth: (user: AuthServerData) => {},
  authExpired: (latestAuth?: AuthServerData) => false,
  logout: (message?: string | null, showMessage?: boolean) => {},
});

export interface AuthContextProviderProps extends PropsWithChildren {}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [auth, setAuth] = React.useState<AuthServerData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const userAuthIntervalRef = React.useRef<NodeJS.Timeout>();

  /** saves user auth data  */
  const saveAuth = React.useCallback((authData: AuthServerData | null) => {
    setLoading(true);

    setAuth(authData);
    const authStorage = new AuthStorage(new LocalStorage());
    authStorage.save(authData);

    if (authData) {
      apiService.setToken(authData.token);
    }

    setLoading(false);
  }, []);

  /** checks if user auth is expired  */
  const authExpired = React.useCallback(
    (latestAuth?: AuthServerData) => {
      if (latestAuth) {
        return latestAuth.expiresIn < Date.now();
      } else {
        if (!auth) {
          return true;
        } else {
          return auth.expiresIn < Date.now();
        }
      }
    },
    [auth]
  );

  /** logs out the current user */
  const logout = React.useCallback(
    (message?: string | null, showMessage: boolean = true) => {
      saveAuth(null);
      const authStorage = new AuthStorage(new LocalStorage());
      authStorage.delete();

      if (!showMessage) return;

      if (message) {
        toast.info(message);
      } else {
        toast.info("LOGOUT SUCCESSFUL");
      }
    },
    [saveAuth]
  );

  /* checks for auth  data locally and sets them on page refresh */
  React.useEffect(() => {
    setLoading(true);
    const authStorage = new AuthStorage(new LocalStorage());
    const savedAuth = authStorage.get();

    if (savedAuth) {
      if (authExpired(savedAuth)) {
        logout("SESSION EXPIRED");
      } else {
        saveAuth(savedAuth);
      }
    } else {
      logout("", false);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * sets auth-token on apiService instance when it changes even when available
   * or not available and runs an interval every 1 minute and checks if auth is about
   * to expire
   */
  React.useEffect(() => {
    if (auth) {
      const _1_MIN = 1000 * 60;
      apiService.setToken(auth.token);

      if (!userAuthIntervalRef.current) {
        userAuthIntervalRef.current = setInterval(() => {
          if (authExpired()) {
            logout("SESSION EXPIRED, LOGIN TO CONTINUE");
          }
        }, _1_MIN);
      }
    } else {
      if (userAuthIntervalRef.current) {
        clearInterval(userAuthIntervalRef.current);
        userAuthIntervalRef.current = undefined;
      }
    }

    return () => {
      userAuthIntervalRef.current && clearInterval(userAuthIntervalRef.current);
      userAuthIntervalRef.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        auth,
        saveAuth,
        authExpired,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
