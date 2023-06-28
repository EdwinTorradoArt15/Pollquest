import axios from "axios";

export const getUser = async (id: string) => {
  return await axios.get(`/api/usuarios/${id}`);
};

export const getUsers = async (token: string) => {
  return await axios.get("/api/usuarios", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const followUser = async (
  idFriend: string,
  idUser: string,
  token: string
) => {
  return await axios.post(
    `/api/usuarios/follow/${idFriend}`,
    { idUser },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const unfollowUser = async (
  idFriend: string,
  idUser: string,
  token: string
) => {
  return await axios.post(
    `/api/usuarios/unfollow/${idFriend}`,
    { idUser },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};