import { useRef, useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { RegisterFormValues } from "@/features/auth/interfaces/auth.interfaces";

const useRegister = () => {
  const { loading, registerUser, methodsAuth } = useContext(AuthContext);
  const password = useRef({});
  password.current = methodsAuth.watch("clave", "");

  const register = async (formUserData: RegisterFormValues) => {
    const userData = {
      nombre: formUserData.nombre,
      apellido: formUserData.apellido,
      celular: formUserData.celular,
      email: formUserData.email,
      clave: formUserData.clave,
    };
    registerUser(userData);
  };

  return {
    methodsAuth,
    register,
    password,
    loading,
  };
};

export default useRegister;
