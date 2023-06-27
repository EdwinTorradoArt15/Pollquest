import {
  Modal,
  Fade,
  TextField,
  Button,
  Box,
  Backdrop,
  Typography,
  useMediaQuery,
  Stack,
  IconButton,
} from "@mui/material";

import { useContext, useEffect } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";
import { useTheme } from "@mui/material/styles";
import {
  Controller,
  useForm,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { Loader } from "@/components";
import { AiFillCamera } from "react-icons/ai";
import noImage from "@/features/administrar/image/noImage.png";

interface ModalAdministrarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormDataCategoryProps {
  nombre: string;
  descripcion: string;
  file?: FileList;
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

const ModalAdministrar = ({ open, setOpen }: ModalAdministrarProps) => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const {
    createCategory,
    updateCategory,
    category,
    setCategory,
    loading,
    image,
    setImg,
  } = useContext(CategoryContext);

  const styles = useStyles();

  const handleClose = () => {
    setImg({ preview: "", data: "" });
    setCategory({});
    setOpen(false);
    reset();
  };

  const handleChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg(img);
  };

  const onsubmit: SubmitHandler<FieldValues> = (formData) => {
    if (category?._id) {
      updateCategory(category._id, formData as FormDataCategoryProps);
    } else {
      createCategory(formData as FormDataCategoryProps);
    }
    handleClose();
  };

  useEffect(() => {
    if (category?._id) {
      setValue("nombre", category.nombre);
      setValue("descripcion", category.descripcion);
      setImg({ preview: category.imagenUrl, data: "" });
    }
  }, [category]);

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
            {category?._id ? "Editar categoria" : "Agregar categoria"}
          </Typography>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(onsubmit)}
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
                    control={control}
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
                control={control}
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
                control={control}
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
