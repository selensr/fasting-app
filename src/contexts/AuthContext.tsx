import { ReactNode, createContext, useContext, useState } from "react";
import { registerUser } from "../server/auth/registerUser";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  register: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const register = async (userData: User) => {
    const res = await registerUser(userData);
    if (res.error) {
      return;
    }
    const { user_id } = res;
    const newUserData = { ...userData, id: user_id };
    localStorage.setItem("user", JSON.stringify(newUserData));
    setUser(newUserData);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue = {
    user,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
