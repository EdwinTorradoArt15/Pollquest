import { useRef, useState, useEffect } from "react";
import jwt from "jwt-decode";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { AccountPopover } from "@/components";
import * as userServices from "@/features/user/services/userServices";

interface NavbarProps {
  onSidebarOpen: () => void;
}

interface DecodedUser {
  _id: string;
  correo: string;
}

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
}

const Navbar = ({ onSidebarOpen }: NavbarProps) => {
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState("");
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    // Generar un color aleatorio en formato hexadecimal y establecerlo como color de fondo del Avatar
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setAvatarBackgroundColor(randomColor);
  }, []);

  const getUserById = async () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decoded = jwt(token) as DecodedUser;
      const { _id } = decoded;
      try {
        const response = await userServices.getUser(_id);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUserById();
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
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
              backgroundColor: avatarBackgroundColor, // Establecer el color de fondo del Avatar
            }}
          >
            {user.nombre && user.apellido && (
              <>{getInitials(user.nombre, user.apellido)}</>
            )}
          </Avatar>
        </Toolbar>
      </AppBar>
      <AccountPopover
        userName={user.nombre + " " + user.apellido}
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

export default Navbar;
