import { createContext, useState, useEffect } from "react";
import * as userServices from "@/features/user/services/userServices";
import jwt from "jwt-decode";
import { toast } from "react-toastify";

interface DecodedUser {
  _id: string;
  correo: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  descripcion?: string;
  imagenPerfilUrl?: string;
  imagenPortadaUrl?: string;
}

interface UserImageData {
  preview: string;
  data: File;
}

interface UserFormData {
  nombre?: string;
  apellido?: string;
  celular?: string;
  email?: string;
  descripcion?: string;
  clave?: string;
}

interface UserContextValues {
  loading: boolean;
  user: User;
  updateInfoUser: (data: UserFormData) => void;
  image: any;
  setImage: (image: any) => void;
  typeImage?: string;
  setTypeImage: (type: string) => void;
  updateImage: (data: UserImageData) => void;
}

export const UserContext = createContext<UserContextValues>({
  loading: false,
  user: {} as User,
  updateInfoUser: () => {},
  image: { preview: "", data: "" },
  setImage: () => {},
  typeImage: "",
  setTypeImage: () => {},
  updateImage: () => {},
});

export const UserProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as User);
  const [typeImage, setTypeImage] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });

  const getUserById = async () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decoded = jwt(token) as DecodedUser;
      const { _id } = decoded;
      try {
        setLoading(true);
        const { data } = await userServices.getUser(_id);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateImage = async (image: UserImageData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (typeImage === "portada") {
        formData.append("portada", image.data, image.data.name);
        await userServices.updateImagePortada(user._id, formData);
      } else if (typeImage === "perfil") {
        formData.append("perfil", image.data, image.data.name);
        await userServices.updateImagePerfil(user._id, formData);
      }
      getUserById();
      setImage({ preview: "", data: "" });
      toast.success("Imagen actualizada correctamente");
    } catch (error: any) {
      toast.error(error.response.data.message || "Error al actualizar");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateInfoUser = async (data: UserFormData) => {
    try {
      setLoading(true);
      await userServices.updateUser(user._id, data);
      getUserById();
      toast.success("Información actualizada correctamente");
    } catch (error: any) {
      toast.error(error.response.data.message || "Error al actualizar");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateInfoUser,
        image,
        setImage,
        typeImage,
        setTypeImage,
        updateImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
