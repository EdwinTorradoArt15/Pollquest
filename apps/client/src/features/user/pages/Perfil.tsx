import { useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import { Stack, Box, Typography, Skeleton } from "@mui/material";
import noImage from "@/features/administrar/image/noImage.png";
import { UserProfile } from "@/features/user/components/";

const Perfil = () => {
  const { user, loading } = useContext(UserContext);

  return (
    <>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "15rem",
              background: "#fff",
              borderRadius: "1rem",
              border: "2px solid #edede9",
            }}
          >
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            ) : (
              <Box
                sx={{
                  backgroundImage: `${
                    user.imagenPortadaUrl
                      ? `url(${user.imagenPortadaUrl})`
                      : `url(${noImage})`
                  }`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                  borderRadius: "1rem",
                }}
              />
            )}
          </Box>
          <UserProfile user={user} loading={loading}/>
        </Box>
        <Box>
          <Typography variant="h5">Creados recientemente</Typography>
          <Typography variant="body2">Cuestionarios</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Perfil;
