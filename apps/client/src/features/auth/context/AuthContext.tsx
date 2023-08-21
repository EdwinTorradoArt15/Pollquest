import { createContext, useState } from "react";
import { toast } from "react-toastify";
import * as authServices from "@/features/auth/services/authServices";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "@/features/auth/interfaces/auth.interfaces";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValues {
  loading: boolean;
  setValue: React.Dispatch<React.SetStateAction<String>>;
  value: String;
  methodsAuth: any;
  loginMutation: any;
  isLoginLoading: boolean;
  registerMutation: any;
  isRegisterLoading: boolean;
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
  methodsAuth: {},
  setValue: () => {},
  loginMutation: () => {},
  isLoginLoading: false,
  registerMutation: () => {},
  isRegisterLoading: false,
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
  const methodsAuth = useForm();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();

  const { isLoading: isLoginLoading, mutate: loginMutation } = useMutation({
    mutationFn: authServices.loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.access_token);
      toast.success("Usuario logueado correctamente");
      methodsAuth.reset();
      navigate("/dashboard/inicio");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const { mutate: registerMutation, isLoading: isRegisterLoading } =
    useMutation({
      mutationFn: authServices.createUser,
      onSuccess: () => {
        toast.success("Usuario registrado correctamente");
        methodsAuth.reset();
        setValue("Login");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        methodsAuth,
        loading,
        setValue,
        value,
        forgotPasswordStep1,
        forgotPasswordStep2,
        forgotPasswordStep3,
        activeStep,
        setActiveStep,
        handleBack,
        loginMutation,
        isLoginLoading,
        registerMutation,
        isRegisterLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
