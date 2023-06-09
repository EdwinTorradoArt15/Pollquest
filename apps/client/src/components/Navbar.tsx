import { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Skeleton,
} from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { FiMoon, FiBell, FiSearch } from "react-icons/fi";
import { AccountPopover, ModalBuscar } from "@/components";

interface NavbarProps {
  onSidebarOpen: () => void;
}

const Navbar = ({ onSidebarOpen }: NavbarProps) => {
  const { user, loading } = useContext(UserContext);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState("");
  const settingsRef = useRef(null);

  useEffect(() => {
    // Generar un color aleatorio en formato hexadecimal y establecerlo como color de fondo del Avatar
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setAvatarBackgroundColor(randomColor);
  }, []);

  /* Obtener iniciales para la foto de perfil si no hay */
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

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 3,
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <IoIosMenu />
          </IconButton>

          {/* Boton buscar */}
          <IconButton onClick={handleOpen}>
            <FiSearch />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton>
              <FiMoon />
            </IconButton>
            <IconButton>
              <FiBell />
            </IconButton>
            {loading ? (
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ ml: 1 }}
              />
            ) : user.imagenPerfilUrl ? (
              <Avatar
                onClick={() => setOpenAccountPopover(true)}
                ref={settingsRef}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                  ml: 1,
                  backgroundColor: avatarBackgroundColor,
                }}
                src={user.imagenPerfilUrl}
              />
            ) : (
              <Avatar
                onClick={() => setOpenAccountPopover(true)}
                ref={settingsRef}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                  ml: 1,
                  backgroundColor: avatarBackgroundColor,
                }}
              >
                {user.nombre && user.apellido && (
                  <>{getInitials(user.nombre, user.apellido)}</>
                )}
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <AccountPopover
        userName={user.nombre + " " + user.apellido}
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
      <ModalBuscar
        open={open}
        setOpen={setOpen}
        avatarBackgroundColor={avatarBackgroundColor}
        getInitials={getInitials}
      />
    </>
  );
};

export default Navbar;
