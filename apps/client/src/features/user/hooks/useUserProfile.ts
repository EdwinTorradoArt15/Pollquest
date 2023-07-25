import { useState, useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import { useLocation } from "react-router-dom";
import { User } from "@/features/user/interface/user.interface";

const useUserProfie = (usuarioMostrado: User) => {
  const { user, loading, followAndUnfollow } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isOtherUserProfile = location.pathname.includes("/perfil/");
  const isFollowing = user?.siguiendo?.includes(usuarioMostrado._id);

  const handleOpenModalAdministrar = () => {
    setOpen(true);
  };

  const handleFollowButton = (typeFollow: string) => {
    followAndUnfollow(usuarioMostrado._id, typeFollow);
  };

  return {
    user,
    loading,
    open,
    setOpen,
    handleOpenModalAdministrar,
    isOtherUserProfile,
    isFollowing,
    handleFollowButton,
  };
};

export default useUserProfie;
