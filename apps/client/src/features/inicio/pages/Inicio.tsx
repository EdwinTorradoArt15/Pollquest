import { useContext } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";
import { Header } from "@/components";
import { Stack, Box } from "@mui/material";
import { CardCategoryInicio } from "@/features/inicio/components";

const Inicio = () => {
  const { categories, getCategories } = useContext(CategoryContext);

  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Header title="Inicio" subtitle="Disfruta de todas nuestras categorías." />
        </Stack>
        <Stack spacing={1}>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {categories.map((category) => (
              <CardCategoryInicio
                key={category.id}
                id={category.id}
                nombre={category.nombre}
                imagen={category.imagenUrl}
                getCategories={getCategories}
              />
            ))}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Inicio;
