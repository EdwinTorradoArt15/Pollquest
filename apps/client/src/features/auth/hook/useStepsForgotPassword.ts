import { useContext, useRef } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  Controller,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { ForgotPassword } from "@/features/auth/interfaces/auth.interfaces";

const useStepsForgotPassword = () => {
  const {
    forgotPasswordStep1,
    forgotPasswordStep2,
    forgotPasswordStep3,
    activeStep,
    setActiveStep,
    loading,
    handleBack,
  } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("clave", "");
  const navigate = useNavigate();

  const handleHome = () => {
    setActiveStep(0);
    navigate("/login");
  };

  const formatedCode = (code: any) => {
    const str = code.join("");
    return str;
  };

  const onSubmit: SubmitHandler<ForgotPassword> = (data) => {
    if (activeStep === 0) {
      forgotPasswordStep1(data);
    } else if (activeStep === 1) {
      const code = formatedCode(data.codigo);
      const newData = {
        ...data,
        codigo: code,
      };
      forgotPasswordStep2(newData);
    } else if (activeStep === 2) {
      forgotPasswordStep3(data);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    password,
    onSubmit,
    handleBack,
    handleHome,
    activeStep,
    loading
  }
};

export default useStepsForgotPassword;
