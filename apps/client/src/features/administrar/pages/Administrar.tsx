import { Stack, Button, SvgIcon, Theme, useMediaQuery } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Header } from "@/components";

const Administrar = () => {

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Stack spacing={1}>
            <Header title="Productos" subtitle="Administrar productos." />
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
                Agregar
              </Button>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default Administrar;
