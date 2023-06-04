import axios from "axios";
import {
  RegisterUser,
  LoginFormValues,
} from "@/features/auth/interfaces/auth.interfaces";

export const createUser = async (user: RegisterUser) => {
  let success = false;
  try {
    const response = await axios.post("/api/usuarios", user);
    success = true;
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return success;
};

export const loginUser = async (user: LoginFormValues) => {
  return await axios.post("/api/usuarios/login", user);
};
