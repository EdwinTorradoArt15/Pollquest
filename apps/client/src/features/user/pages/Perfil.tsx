import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import { Stack, Skeleton } from "@mui/material";
import noImage from "@/features/administrar/image/noImage.png";
import { UserProfile, ModalImagesUser } from "@/features/user/components/";
import { AiFillCamera } from "react-icons/ai";
import { useParams } from "react-router-dom";

const Perfil = () => {
  const { user, loading, setTypeImage, userFriend, getUserByIdFriend } =
    useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleOpenModal = (type: string) => {
    setTypeImage(type);
    setOpenModal(true);
  };

  const usuarioMostrado = id ? userFriend : user;

  useEffect(() => {
    if (id) {
      getUserByIdFriend(id);
    }
  }, [id]);

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
              position: "relative",
              width: "100%",
              height: "15rem",
              borderRadius: "1rem",
              border: "2px solid #edede9",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": usuarioMostrado === user ? { opacity: 0.8 } : {},
            }}
            onClick={
              usuarioMostrado === user
                ? () => handleOpenModal("portada")
                : () => {}
            }
          >
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            ) : (
              <>
                {usuarioMostrado.imagenPortadaUrl ? (
                  <img
                    src={usuarioMostrado.imagenPortadaUrl}
                    alt="Portada"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={noImage}
                    alt="Portada"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                {usuarioMostrado === user && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      alignItems: "start",
                      gap: "4px",
                      justifyContent: "center",
                      color: "#fff",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    <AiFillCamera />
                    <Typography variant="subtitle2">Cambiar foto</Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
          <UserProfile
            usuarioMostrado={usuarioMostrado}
            user={user}
            loading={loading}
            handleOpenModal={handleOpenModal}
          />
        </Box>
        <Box>
          <Typography variant="h5">Creados recientemente</Typography>
          <Typography variant="body2">Cuestionarios</Typography>
        </Box>
      </Stack>
      <ModalImagesUser open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default Perfil;
