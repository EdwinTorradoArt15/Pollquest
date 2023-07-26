import { Header } from "@/components";
import { Stack, useMediaQuery, Button, SvgIcon, Theme } from "@mui/material";
import { FiPlus } from "react-icons/fi";

const Cuestionarios = () => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });
  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Stack spacing={1}>
            <Header title="Cuestionarios" subtitle="Crea tus cuestionario." />
          </Stack>
          <div>
            <Button
              sx={{
                fontSize: smUp ? "1rem" : "0.75rem",
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <FiPlus />
                </SvgIcon>
              }
              variant="contained"
            >
              Crear
            </Button>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default Cuestionarios;
