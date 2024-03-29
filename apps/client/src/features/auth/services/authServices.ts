import axios from "axios";
import {
  RegisterUser,
  LoginFormValues,
  ForgotPassword,
} from "@/features/auth/interfaces/auth.interfaces";

export const createUser = async (user: RegisterUser) => {
  await axios.post("/api/usuarios", user);
};

export const loginUser = async (user: LoginFormValues) => {
  return await axios.post("/api/usuarios/login", user);
};

export const forgotPasswordStep1 = async (email: ForgotPassword) => {
  return await axios.patch("/api/usuarios/forgot-password/step1", email);
};

export const forgotPasswordStep2 = async (data: ForgotPassword) => {
  return await axios.patch("/api/usuarios/forgot-password/step2", data);
};

export const forgotPasswordStep3 = async (data: ForgotPassword) => {
  return await axios.patch("/api/usuarios/forgot-password/step3", data);
};
