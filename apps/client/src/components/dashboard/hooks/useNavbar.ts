import { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";

const useNavbar = () => {
  const { user, loading } = useContext(UserContext);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState("");
  const settingsRef = useRef(null);

  useEffect(() => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setAvatarBackgroundColor(randomColor);
  }, []);

  const getInitials = (name: string, apellido: string) => {
    const names = name.split(" ");
    const lastNames = apellido.split(" ");
    const initials =
      names[0].substring(0, 1).toUpperCase() +
      lastNames[0].substring(0, 1).toUpperCase();
    return initials;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return {
    user,
    loading,
    openAccountPopover,
    setOpenAccountPopover,
    open,
    setOpen,
    avatarBackgroundColor,
    settingsRef,
    getInitials,
    handleOpen,
  };
};

export default useNavbar;
