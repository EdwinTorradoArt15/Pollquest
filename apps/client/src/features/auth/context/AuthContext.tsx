import { createContext, useState } from "react";
import { toast } from "react-toastify";
import * as authServices from "@/features/auth/services/authServices";
import { useNavigate } from "react-router-dom";
import {
  RegisterFormValues,
  LoginFormValues,
  ForgotPassword,
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
  forgotPasswordStep1: (email: ForgotPassword) => void;
  forgotPasswordStep2: (data: ForgotPassword) => void;
  forgotPasswordStep3: (data: ForgotPassword) => void;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleBack?: () => void;
}

export const AuthContext = createContext<AuthContextValues>({
  loading: false,
  value: "Login",
  setValue: () => {},
  registerUser: () => {},
  loginUser: () => {},
  forgotPasswordStep1: () => {},
  forgotPasswordStep2: () => {},
  forgotPasswordStep3: () => {},
  activeStep: 0,
  setActiveStep: () => {},
  handleBack: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<String>("Login");
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const forgotPasswordStep1 = async (email: ForgotPassword) => {
    try {
      setLoading(true);
      await authServices.forgotPasswordStep1(email);
      handleNext();
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  const forgotPasswordStep2 = async (data: ForgotPassword) => {
    try {
      setLoading(true);
      await authServices.forgotPasswordStep2(data);
      toast.success("Codigo enviado correctamente");
      handleNext();
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar el codigo");
    } finally {
      setLoading(false);
    }
  };

  const forgotPasswordStep3 = async (data: ForgotPassword) => {
    try {
      setLoading(true);
      await authServices.forgotPasswordStep3(data);
      toast.success("Contraseña cambiada correctamente");
      handleNext();
    } catch (error) {
      console.error(error);
      toast.error("Error al cambiar la contraseña");
    }finally{
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        loading,
        setValue,
        value,
        forgotPasswordStep1,
        forgotPasswordStep2,
        forgotPasswordStep3,
        activeStep,
        setActiveStep,
        handleBack,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
