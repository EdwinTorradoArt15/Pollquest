import axios from "axios";

export const getUser = async (id: string) => {
  return await axios.get(`/api/usuarios/${id}`);
};

export const updateUser = async <T>(id: string, data: T) => {
  return await axios.patch(`/api/usuarios/info/${id}`, data);
};
