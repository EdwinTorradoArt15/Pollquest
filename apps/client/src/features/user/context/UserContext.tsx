import { createContext, useState, useEffect } from "react";
import * as userServices from "@/features/user/services/userServices";
import jwt from "jwt-decode";

interface DecodedUser {
  _id: string;
  correo: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
}

interface UserContextValues {
  user: User;
}

export const UserContext = createContext<UserContextValues>({
  user: {} as User,
});

export const UserProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as any);

  const getUserById = async () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decoded = jwt(token) as DecodedUser;
      const { _id } = decoded;
      try {
        const response = await userServices.getUser(_id);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
