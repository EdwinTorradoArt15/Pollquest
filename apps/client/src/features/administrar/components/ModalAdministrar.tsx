import {
  Modal,
  Fade,
  TextField,
  Button,
  Box,
  Backdrop,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Loader } from "@/components";
import { AiFillCamera } from "react-icons/ai";
import { useStyles } from "@/utils/modal/useStyles";
import noImage from "@/features/administrar/image/noImage.png";
import { useModal } from "@/features/administrar/hook";


const ModalAdministrar = () => {
  const {
    openModal,
    handleClose,
    category,
    onsubmit,
    image,
    handleChange,
    loading,
    methodsCategory,
  } = useModal();

  const styles = useStyles();

  return (
    <Modal
      open={openModal}
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
      <Fade in={openModal}>
        <Box sx={styles}>
          <Typography variant="h5" gutterBottom>
            {category?._id ? "Editar categoria" : "Agregar categoria"}
          </Typography>
          <form
            encType="multipart/form-data"
            onSubmit={methodsCategory.handleSubmit(onsubmit)}
            style={{ marginTop: "20px" }}
          >
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
                  <Controller
                    name="file"
                    control={methodsCategory.control}
                    defaultValue={undefined}
                    render={({ field }) => (
                      <input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange(e);
                        }}
                        style={{ display: "none" }}
                      />
                    )}
                  />
                </div>
              </Box>
              <Controller
                name="nombre"
                control={methodsCategory.control}
                rules={{ required: "Campo requerido" }}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nombre"
                    type="text"
                    helperText={error?.message}
                    error={error ? true : false}
                  />
                )}
              />
              <Controller
                name="descripcion"
                control={methodsCategory.control}
                rules={{ required: "Campo requerido" }}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Descripcion"
                    type="text"
                    helperText={error?.message}
                    error={error ? true : false}
                  />
                )}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  size="medium"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Loader /> : category?._id ? "Editar" : "Agregar"}
                </Button>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalAdministrar;
