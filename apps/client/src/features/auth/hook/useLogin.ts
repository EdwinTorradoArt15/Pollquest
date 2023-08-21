import { useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { LoginFormValues } from "@/features/auth/interfaces/auth.interfaces";

const useLogin = () => {
  const {
    value,
    setValue,
    methodsAuth,
    loginMutation,
    isLoginLoading,
  } = useContext(AuthContext);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const login = (data: LoginFormValues) => {
    loginMutation(data);
  };

  return {
    value,
    handleChange,
    login,
    methodsAuth,
    isLoginLoading,
  };
};

export default useLogin;
