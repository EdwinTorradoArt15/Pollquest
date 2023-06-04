import { useRef, useState, useEffect } from "react";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { AccountPopover } from "@/components";

interface NavbarProps {
  onSidebarOpen: () => void;
}

const Navbar = ({ onSidebarOpen }: NavbarProps) => {
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState("");

  useEffect(() => {
    // Generar un color aleatorio en formato hexadecimal y establecerlo como color de fondo del Avatar
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setAvatarBackgroundColor(randomColor);
  }, []);

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
            <p>ET{/* {getInitial(userName).toUpperCase()} */}</p>
          </Avatar>
        </Toolbar>
      </AppBar>
      <AccountPopover
        userName={""}
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

export default Navbar;