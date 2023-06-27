import { useEffect, useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";
import {
  Modal,
  Fade,
  TextField,
  Button,
  Box,
  Backdrop,
  Typography,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Controller,
  useForm,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { Loader } from "@/components";

interface ModalUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface UserFormData {
  nombre?: string;
  apellido?: string;
  celular?: string;
  email?: string;
  descripcion?: string;
  clave?: string;
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

const ModalUser = ({ open, setOpen }: ModalUserProps) => {
  const { user, updateInfoUser, loading } = useContext(UserContext);
  const { control, handleSubmit, reset, setValue } = useForm();

  const styles = useStyles();

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  useEffect(() => {
    if (user) {
      setValue("nombre", user.nombre);
      setValue("apellido", user.apellido);
      setValue("celular", user.celular);
      setValue("email", user.email);
      setValue("descripcion", user.descripcion);
    }
  }, [open]);

  const updateUser: SubmitHandler<FieldValues> = (data) => {
    if (data.clave === "") delete data.clave;
    updateInfoUser(data as UserFormData);
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
            Editar informacion
          </Typography>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(updateUser)}
            style={{ marginTop: "20px" }}
          >
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="apellido"
                  control={control}
                  rules={{ required: "Campo requerido" }}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Apellido"
                      type="text"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="celular"
                  control={control}
                  rules={{ required: "Campo requerido" }}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Celular"
                      type="text"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Campo requerido" }}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      type="text"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="clave"
                  control={control}
                  //   rules={{  }}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Clave"
                      type="password"
                      helperText={error?.message}
                      error={error ? true : false}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader /> : "Guardar"}
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
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalUser;
