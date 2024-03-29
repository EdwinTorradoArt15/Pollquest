import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Tab,
  Tabs,
} from "@mui/material";
import { FormLogin, FormRegister } from "@/features/auth/components";
import { useLogin } from "@/features/auth/hook";
import banner from "../assets/banner.png";

const Login = () => {
  const { handleChange, value } = useLogin();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
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
                  <Stack spacing={1} sx={{ my: 2 }}>
                    <Typography variant="h4">¡Bienvenido de nuevo!</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Descubre. Aprende. Opina. Con PollQuest, tus encuestas y
                      quices cobran vida.
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
          <img
            src={banner}
            alt="slider"
            style={{ height: "97vh", width: "100%" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Login;
