import { Controller } from "react-hook-form";
import { Button, FormHelperText, TextField, Grid } from "@mui/material";
import { Loader } from "@/components";
import { year } from "@/utils/date";
import { useRegister } from "@/features/auth/hook";

const FormRegister = () => {
  const { register, password, loading, methodsAuth } = useRegister();

  return (
    <form onSubmit={methodsAuth.handleSubmit(register)}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={6}>
          <Controller
            name="nombre"
            control={methodsAuth.control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                type="text"
                label="Nombre"
                error={!!methodsAuth.formState.errors.nombre}
                helperText={
                  methodsAuth.formState.errors.nombre ? "Campo requerido" : null
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="apellido"
            control={methodsAuth.control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                type="text"
                label="Apellido"
                error={!!methodsAuth.formState.errors.apellido}
                helperText={
                  methodsAuth.formState.errors.apellido
                    ? "Campo requerido"
                    : null
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="celular"
            control={methodsAuth.control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                type="number"
                label="Celular"
                error={!!methodsAuth.formState.errors.celular}
                helperText={
                  methodsAuth.formState.errors.celular
                    ? "Campo requerido"
                    : null
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="email"
            control={methodsAuth.control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                type="email"
                label="Correo electrónico"
                error={!!methodsAuth.formState.errors.email}
                helperText={
                  methodsAuth.formState.errors.email ? "Campo requerido" : null
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="clave"
            control={methodsAuth.control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                type="password"
                label="Contraseña"
                error={!!methodsAuth.formState.errors.clave}
                helperText={
                  methodsAuth.formState.errors.clave ? "Campo requerido" : null
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="confirmarClave"
            control={methodsAuth.control}
            rules={{
              required: "Este campo es requerido",
              validate: (value) =>
                value === password.current || "Las contraseñas no coinciden",
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                type="password"
                label="Confirmar contraseña"
                error={!!methodsAuth.formState.errors.confirmarClave}
                helperText={
                  methodsAuth.formState.errors.confirmarClave
                    ? "Campo requerido"
                    : null
                }
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
