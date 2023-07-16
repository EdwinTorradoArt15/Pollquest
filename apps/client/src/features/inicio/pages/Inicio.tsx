import { useContext } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";
import { Header } from "@/components";
import { Stack, Box, Skeleton } from "@mui/material";
import { CardCategoryInicio } from "@/features/inicio/components";

const Inicio = () => {
  const { categories, getCategories, loading } = useContext(CategoryContext);

  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Header
            title="Inicio"
            subtitle="Disfruta de todas nuestras categorías."
          />
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
            {loading ? (
              <>
                {[...Array(7)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width="15rem"
                    height="10rem"
                  />
                ))}
              </>
            ) : (
              categories.map((category) => (
                <CardCategoryInicio
                  key={category._id}
                  id={category._id}
                  nombre={category.nombre}
                  imagen={category.imagenUrl}
                  getCategories={getCategories}
                />
              ))
            )}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Inicio;
