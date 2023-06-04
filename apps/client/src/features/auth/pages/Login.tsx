import { useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Tab,
  Tabs,
} from "@mui/material";
import { FormLogin, FormRegister, Slider } from "@/features/auth/components";

const Login = () => {
  const { value, setValue } = useContext(AuthContext);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: !mdUp ? "100%" : "50%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid #e0e0e0",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              width: 550,
              px: 3,
            }}
          >
            <div>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Inicio sesión" value="Login" />
                <Tab label="Registrarse" value="Register" />
              </Tabs>
              {value === "Login" && (
                <>
                  <Stack spacing={1} sx={{ my: 3 }}>
                    <Typography variant="h4">Inicia sesión</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Bienvenido a QuizzApp. Por favor inicie sesión para
                      continuar.
                    </Typography>
                  </Stack>
                  <FormLogin />
                </>
              )}
              {value === "Register" && (
                <Box>
                  <Stack spacing={1} sx={{ my: 3 }}>
                    <Typography variant="h4">Registrate</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Agrega tus datos para poder registrarte en QuizzApp
                    </Typography>
                  </Stack>
                  <FormRegister />
                </Box>
              )}
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            display: !mdUp ? "none" : "block",
            width: !mdUp ? "0%" : "50%",
          }}
        >
          <Slider />
        </Box>
      </Box>
    </>
  );
};

export default Login;
