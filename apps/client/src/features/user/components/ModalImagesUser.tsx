import {
  Modal,
  Fade,
  Box,
  Backdrop,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { Loader } from "@/components";
import { AiFillCamera } from "react-icons/ai";
import noImage from "@/features/administrar/image/noImage.png";
import { useStyles } from "@/utils/modal/useStyles";
import { useModalImagesUser } from "@/features/user/hooks";

interface ModalUserImagesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalImagesUser = ({ open, setOpen }: ModalUserImagesProps) => {
  const { handleClose, image, handleChange, onSubmit, loading } =
    useModalImagesUser(setOpen);
  const styles = useStyles();

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
