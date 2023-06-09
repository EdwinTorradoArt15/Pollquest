import { useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  FormHelperText,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { LoginFormValues } from "@/features/auth/interfaces/auth.interfaces";
import { Loader } from "@/components";
import { year } from "@/utils/date";
import { Link } from "react-router-dom";

const FormLogin = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();
  const { loginUser, loading } = useContext(AuthContext);

  const login = (data: LoginFormValues) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={1}>
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
        disabled={loading}
      >
        {loading ? <Loader /> : "Iniciar sesión"}
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
