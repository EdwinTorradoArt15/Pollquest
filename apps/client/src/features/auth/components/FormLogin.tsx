import { Controller } from "react-hook-form";
import {
  Button,
  FormHelperText,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { Loader } from "@/components";
import { year } from "@/utils/date";
import { Link } from "react-router-dom";
import { useLogin } from "@/features/auth/hook";

const FormLogin = () => {
  const { methodsAuth, login, isLoginLoading } = useLogin();

  return (
    <form onSubmit={methodsAuth.handleSubmit(login)}>
      <Stack spacing={1}>
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
              label="Correo electrónico *"
              error={!!methodsAuth.formState.errors.email}
              helperText={
                methodsAuth.formState.errors.email ? "Campo requerido" : null
              }
            />
          )}
        />
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
              label="Contraseña *"
              error={!!methodsAuth.formState.errors.clave}
              helperText={
                methodsAuth.formState.errors.clave ? "Campo requerido" : null
              }
            />
          )}
        />
        <Link to="/forgot-password">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Link>
      </Stack>
      <Button
        sx={{ mt: 3 }}
        color="primary"
        fullWidth
        size="large"
        variant="contained"
        type="submit"
        disabled={isLoginLoading}
      >
        {isLoginLoading ? <Loader /> : "Iniciar sesión"}
      </Button>

      <Typography
        marginY="3px"
        textAlign="center"
        color="text.secondary"
        variant="body2"
      >
        ó
      </Typography>

      <Button color="primary" fullWidth size="large" variant="contained">
        Iniciar sesión con Google
      </Button>
      <FormHelperText sx={{ mt: 1 }}>
        &copy; {year} ARTECH - Derechos totalmente reservados.
      </FormHelperText>
    </form>
  );
};

export default FormLogin;
