"use client";

import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {AuthResponse} from "@/lib/interfaces/IAuth";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (response: AuthResponse) => void;
  logout: () => void;
  profileChanged: (response: AuthResponse) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          name: payload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
          email:
            payload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          role: payload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();

  const login = (response: AuthResponse) => {
    if (response.success && response.data?.token) {
      document.cookie = `token=${response.data.token}; path=/; max-age=604800; samesite=strict`;
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=604800; samesite=strict`;

      const payload = JSON.parse(atob(response.data.token.split(".")[1]));
      setUser({
        name: payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        email:
          payload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
        role: payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      });
      if (response.route) {
        router.push(response.route);
      }
    }
  };

  const profileChanged = (response: AuthResponse) => {
    if (response.success && response.data?.token) {
      document.cookie = `token=${response.data.token}; path=/; max-age=604800; samesite=strict`;

      const payload = JSON.parse(atob(response.data.token.split(".")[1]));
      setUser({
        name: payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        email:
          payload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
        role: payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      });
      if (response.route) {
        router.push(response.route);
      }
    }
  };

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    setUser(null);
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{user, isLoading, login, logout, profileChanged}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
