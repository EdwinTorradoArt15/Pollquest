import { createContext, useState } from "react";
import { toast } from "react-toastify";
import * as authServices from "@/features/auth/services/authServices";
import { useNavigate } from "react-router-dom";
import {
  RegisterFormValues,
  LoginFormValues,
} from "../interfaces/auth.interfaces";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValues {
  loading: boolean;
  setValue: React.Dispatch<React.SetStateAction<String>>;
  value: String;
  registerUser: (data: RegisterFormValues) => void;
  loginUser: (data: LoginFormValues) => void;
}

export const AuthContext = createContext<AuthContextValues>({
  loading: false,
  value: "Login",
  setValue: () => {},
  registerUser: () => {},
  loginUser: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<String>("Login");

  const navigate = useNavigate();

  const registerUser = async (data: RegisterFormValues) => {
    // Formateamos data para quitar el confirmar clave
    const userData = {
      nombre: data.nombre,
      apellido: data.apellido,
      celular: data.celular,
      email: data.email,
      clave: data.clave,
    };
    try {
      setLoading(true);
      const success = await authServices.createUser(userData);
      setLoading(false);
      if (success) {
        toast.success("Usuario registrado correctamente");
        setValue("Login");
      } else {
        toast.error("Error al registrar el usuario");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const loginUser = async (dataUser: LoginFormValues) => {
    try {
      setLoading(true);
      const { data } = await authServices.loginUser(dataUser);
      localStorage.setItem("token", data.access_token);
      toast.success("Usuario logueado correctamente");
      setLoading(false);
      navigate("/dashboard/inicio");
    } catch (error) {
      setLoading(false);
      toast.error("Correo o contraseña incorrectas");
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, loading, setValue, value }}
    >
      {children}
    </AuthContext.Provider>
  );
};
