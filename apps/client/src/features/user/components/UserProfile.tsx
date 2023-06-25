import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  SvgIcon,
  Theme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { FiEdit, FiPlus } from "react-icons/fi";
import noImage from "@/features/administrar/image/noImage.png";
import { useLocation } from "react-router-dom";
import { ModalUser } from "@/features/user/components/";

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  descripcion?: string;
  imagenPerfilUrl?: string;
  imagenPortadaUrl?: string;
}

interface UserProfileProps {
  user: User;
  loading: boolean;
}

const UserProfile = ({ user, loading }: UserProfileProps) => {
  const [open, setOpen] = useState(false);
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });
  const location = useLocation();
  const isOtherUserProfile = location.pathname.includes("/perfil/");

  const handleOpenModalAdministrar = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          bottom: "8rem",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "15rem",
            height: "15rem",
            borderRadius: "50%",
            border: "2px solid #edede9",
          }}
        >
          {loading ? (
            <Skeleton
              variant="circular"
              width="100%"
              height="100%"
              animation="wave"
            />
          ) : (
            <>
              {user.imagenPerfilUrl ? (
                <img
                  src={user.imagenPerfilUrl}
                  alt="Perfil"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src={noImage}
                  alt="Perfil"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              )}
            </>
          )}
        </Box>
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Typography variant="h5" align="center">
            {user.nombre} {user.apellido}
          </Typography>
          <Typography variant="inherit" align="center">
            {user.descripcion}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!isOtherUserProfile && (
            <Button
              sx={{
                mt: 2,
                fontSize: smUp ? "1rem" : "0.75rem",
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <FiEdit />
                </SvgIcon>
              }
              variant="contained"
              onClick={handleOpenModalAdministrar}
            >
              Editar perfil
            </Button>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {isOtherUserProfile && (
            <Button
              sx={{
                fontSize: smUp ? "1rem" : "0.75rem",
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <FiPlus />
                </SvgIcon>
              }
              variant="contained"
            >
              Seguir
            </Button>
          )}
          <Box
            sx={{
              background: "#fff",
              borderRadius: "6px",
              padding: "0.5rem",
              boxShadow: "0 0 5px rgba(0,0,0,0.5)",
            }}
          >
            <Typography variant="h6" align="center">
              Seguidores 0K
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#fff",
              borderRadius: "6px",
              padding: "0.5rem",
              boxShadow: "0 0 5px rgba(0,0,0,0.5)",
            }}
          >
            <Typography variant="h6" align="center">
              Seguidores 0K
            </Typography>
          </Box>
        </Box>
      </Box>
      <ModalUser open={open} setOpen={setOpen} />
    </>
  );
};

export default UserProfile;
