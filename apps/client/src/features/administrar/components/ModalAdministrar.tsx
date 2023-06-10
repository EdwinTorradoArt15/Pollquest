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
} from "@mui/material";

import { useContext } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Loader } from "@/components";

interface ModalAdministrarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormCreateCategoryProps {
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
  const { control, handleSubmit, reset } = useForm();
  const { createCategory, loading } = useContext(CategoryContext);

  const styles = useStyles();

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const postCategory = (formCategoryData: FormCreateCategoryProps) => {
    createCategory(formCategoryData);
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
            Agregar Categoria
          </Typography>
          <form
            onSubmit={handleSubmit(postCategory)}
            style={{ marginTop: "20px" }}
          >
            <Stack spacing={2}>
              <Controller
                name="file"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                )}
              />
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
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
              >
                {loading ? <Loader /> : "Agregar"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalAdministrar;
