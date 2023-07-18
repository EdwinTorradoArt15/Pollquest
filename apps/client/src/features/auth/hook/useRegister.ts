import { useRef, useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { useForm } from "react-hook-form";
import { RegisterFormValues } from "@/features/auth/interfaces/auth.interfaces";

const useRegister = () => {
  const { control, handleSubmit, watch } = useForm<RegisterFormValues>();
  const { loading, registerUser } = useContext(AuthContext);
  const password = useRef({});
  password.current = watch("clave", "");

  const register = async (formUserData: RegisterFormValues) => {
    registerUser(formUserData);
  };

  return {
    control,
    handleSubmit,
    register,
    password,
    loading,
  }
};

export default useRegister;
