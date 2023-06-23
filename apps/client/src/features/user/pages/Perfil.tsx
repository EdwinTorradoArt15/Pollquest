import { useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import { Stack, Box, Typography } from "@mui/material";
import noImage from "@/features/administrar/image/noImage.png";
import { UserProfile } from "@/features/user/components/";

const Perfil = () => {
  const { user } = useContext(UserContext);

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
              backgroundImage: `url(${noImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "1px solid black",
            }}
          />
          <UserProfile user={user} />
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
