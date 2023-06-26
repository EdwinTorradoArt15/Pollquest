import axios from "axios";

export const getUser = async (id: string) => {
  return await axios.get(`/api/usuarios/${id}`);
};

export const updateUser = async <T>(id: string, data: T) => {
  return await axios.patch(`/api/usuarios/info/${id}`, data);
};

export const updateImagePerfil = async <T>(id: string, data: T) => {
  return await axios.patch(`/api/usuarios/perfil/${id}`, data);
};

export const updateImagePortada = async <T>(id: string, data: T) => {
  return await axios.patch(`/api/usuarios/portada/${id}`, data);
};
