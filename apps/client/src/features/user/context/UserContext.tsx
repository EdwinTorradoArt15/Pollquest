import { createContext, useState, useEffect } from "react";
import * as userServices from "@/features/user/services/userServices";
import jwt from "jwt-decode";
import { toast } from "react-toastify";
import {
  User,
  UserFormData,
  UserImageData,
} from "@/features/user/interface/user.interface";

interface DecodedUser {
  _id: string;
  correo: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
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
  users: User[];
  getUserByIdFriend: (id: string) => void;
  userFriend: User;
  typeFollow?: string;
  followAndUnfollow: (id: string, typeFollow: string) => void;
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
  users: [],
  getUserByIdFriend: () => {},
  userFriend: {} as User,
  typeFollow: "",
  followAndUnfollow: () => {},
});

export const UserProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as User);
  const [userFriend, setUserFriend] = useState({} as User);
  const [users, setUsers] = useState<User[]>([]);
  const [typeImage, setTypeImage] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token") as string;
      const { data } = await userServices.getUsers(token);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getUserByIdFriend = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await userServices.getUser(id);
      setUserFriend(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const followAndUnfollow = async (id: string, typeFollow: string) => {
    try {
      const token = localStorage.getItem("token") as string;
      if (typeFollow === "follow") {
        await userServices.followUser(id, user._id, token);
      } else if (typeFollow === "unfollow") {
        await userServices.unfollowUser(id, user._id, token);
      }
      getUserById();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserById();
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        userFriend,
        loading,
        updateInfoUser,
        image,
        setImage,
        typeImage,
        setTypeImage,
        updateImage,
        getUserByIdFriend,
        followAndUnfollow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
