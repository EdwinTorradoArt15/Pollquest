import { useState, useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";

const useModalBuscar = (setOpen: (open: boolean) => void) => {
  const { users, user } = useContext(UserContext);
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setSearch("");
    setOpen(false);
  };

  const filteredUsers = users.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return {
    user,
    handleClose,
    filteredUsers,
    search,
    setSearch
  }
};

export default useModalBuscar;
