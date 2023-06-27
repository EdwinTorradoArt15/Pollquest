import { useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import {
  Modal,
  Fade,
  Box,
  Backdrop,
  Typography,
  useMediaQuery,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Loader } from "@/components";
import { AiFillCamera } from "react-icons/ai";
import noImage from "@/features/administrar/image/noImage.png";

interface ModalUserImagesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useStyles = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isCustom = useMediaQuery(theme.breakpoints.down(800));

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmall ? "90vw" : isMedium ? "35vw" : isCustom ? "50vw" : "35vw",
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };
};

const ModalImagesUser = ({ open, setOpen }: ModalUserImagesProps) => {
  const { image, setImage, loading, updateImage } = useContext(UserContext);

  const styles = useStyles();

  const handleChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    updateImage(image);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={styles}>
          <Typography variant="h5" gutterBottom>
            Editar foto perfil
          </Typography>
          <Stack spacing={2}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={image.preview ? image.preview : noImage}
                alt="No hay imagen"
                style={{
                  width: "100%",
                  height: "8rem",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderTopLeftRadius: "0.375rem",
                  borderTopRightRadius: "0.375rem",
                }}
              />
              <div
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  borderBottomLeftRadius: "0.375rem",
                  borderBottomRightRadius: "0.375rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => {
                    const fileInput = document.getElementById("file");
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  <AiFillCamera size={22} color="#000" />
                </IconButton>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? <Loader /> : "Guardar"}
              </Button>
              <Button
                fullWidth
                color="error"
                variant="contained"
                size="medium"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalImagesUser;
