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
import { useNavbar } from "@/components/dashboard/hooks";

interface NavbarProps {
  onSidebarOpen: () => void;
}

const Navbar = ({ onSidebarOpen }: NavbarProps) => {
  const {
    handleOpen,
    avatarBackgroundColor,
    getInitials,
    loading,
    open,
    user,
    openAccountPopover,
    setOpen,
    setOpenAccountPopover,
    settingsRef,
  } = useNavbar();

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
