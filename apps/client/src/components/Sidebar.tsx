import { useRef, useState, useEffect } from "react";
import { NavItem } from "@/components";
import {
  FiHome,
  FiFileText,
  FiCheckCircle,
  FiUser,
  FiSettings,
} from "react-icons/fi";

import {
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
interface SidebarProps {
  onClose: () => void;
  open: boolean;
}

const itemsSidebar = [
  {
    href: "/dashboard/inicio",
    icon: <FiHome fontSize="small" />,
    title: "Inicio",
  },
  {
    href: "/dashboard/cuestionarios",
    icon: <FiFileText fontSize="small" />,
    title: "Cuestionarios",
  },
  {
    href: "/dashboard/completados",
    icon: <FiCheckCircle fontSize="small" />,
    title: "Completados",
  },
  {
    href: "/dashboard/perfil",
    icon: <FiUser fontSize="small" />,
    title: "Perfil",
  },
  {
    href: "/dashboard/administrar",
    icon: <FiSettings fontSize="small" />,
    title: "Administrar",
  },
];

const Sidebar = ({ onClose, open }: SidebarProps) => {
  const year = new Date().getFullYear();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3, pb: 0 }}>
          <Box
            sx={{
              display: "inline-flex",
              height: 65,
              width: 65,
            }}
          >
            <Typography >POLLQUEST</Typography>
            {/* <img src={""} alt="Logo" /> */}
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: "#neutral.100",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {itemsSidebar.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "neutral.100" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.400" variant="caption">
            &copy; {year} ARTECH - Derechos totalmente reservados.
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "primary.main",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "primary.main",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;