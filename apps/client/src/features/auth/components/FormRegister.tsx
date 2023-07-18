import { Controller } from "react-hook-form";
import { Button, FormHelperText, TextField, Grid } from "@mui/material";
import { Loader } from "@/components";
import { year } from "@/utils/date";
import { useRegister } from "@/features/auth/hook";

const FormRegister = () => {
  const { handleSubmit, register, control, password, loading } = useRegister();

  return (
    <form onSubmit={handleSubmit(register)}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={6}>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                {...field}
                type="text"
                label="Nombre"
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="apellido"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                {...field}
                type="text"
                label="Apellido"
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="celular"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                {...field}
                type="number"
                label="Celular"
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                {...field}
                type="email"
                label="Correo electrónico"
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="clave"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                {...field}
                type="password"
                label="Contraseña"
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="confirmarClave"
            control={control}
            rules={{
              required: "Este campo es requerido",
              validate: (value) =>
                value === password.current || "Las contraseñas no coinciden",
            }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                {...field}
                type="password"
                label="Confirmar contraseña"
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button
        sx={{ mt: 3 }}
        color="primary"
        fullWidth
        size="large"
        variant="contained"
        type="submit"
      >
        {loading ? <Loader /> : "Registrarse"}
      </Button>
      <FormHelperText sx={{ mt: 1 }}>
        &copy; {year} ARTECH - Derechos totalmente reservados.
      </FormHelperText>
    </form>
  );
};

export default FormRegister;
