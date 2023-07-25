import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import { useParams } from "react-router-dom";


const usePerfil = () => {
  const { user, loading, setTypeImage, userFriend, getUserByIdFriend } =
    useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleOpenModal = (type: string) => {
    setTypeImage(type);
    setOpenModal(true);
  };

  const usuarioMostrado = id ? userFriend : user;

  useEffect(() => {
    if (id) {
      getUserByIdFriend(id);
    }
  }, [id]);

  return {
    user,
    loading,
    openModal,
    setOpenModal,
    handleOpenModal,
    usuarioMostrado,
  }
};

export default usePerfil;
