import {
  Box,
  Typography,
  Button,
  SvgIcon,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { FiEdit, FiPlus } from "react-icons/fi";
import noImage from "@/features/administrar/image/noImage.png";
import { useLocation } from "react-router-dom";

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
}

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });
  const location = useLocation();
  const isOtherUserProfile = location.pathname.includes("/perfil/");

  return (
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
          backgroundImage: `url(${noImage})`,
          backgroundSize: "container",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "15rem",
          height: "15rem",
          borderRadius: "50%",
          border: "2px solid red",
        }}
      />
      <Box sx={{ mt: 1 }}>
        <Typography variant="h5" align="center">
          {user.nombre} {user.apellido}
        </Typography>
        <Typography variant="h6" align="center">
          Descripcion
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
  );
};

export default UserProfile;
