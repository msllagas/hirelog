import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { User } from "@/types/user.ts";
import axios from '@/config/axios';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthProviderState = {
  user: User | null;
  setUser: (user: User | null) => void;
  isFetchingUser: boolean;
};


const AuthContext = createContext<AuthProviderState | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get("/user");
        setUser(data);
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setIsFetchingUser(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser, isFetchingUser}}>{children}</AuthContext.Provider>
)
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
