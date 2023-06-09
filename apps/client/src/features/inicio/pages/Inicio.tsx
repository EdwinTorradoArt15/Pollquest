import { Header } from "@/components";
import { Stack } from "@mui/material";

const Inicio = () => {
  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Header title="Inicio" subtitle="Toda la vista principal." />
        </Stack>
      </Stack>
    </>
  );
};

export default Inicio;
