import { Header } from "@/components";
import { Stack } from "@mui/material";

const Completados = () => {
  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Header title="Completados" subtitle="Cuestionarios completados." />
        </Stack>
      </Stack>
    </>
  );
};

export default Completados;
