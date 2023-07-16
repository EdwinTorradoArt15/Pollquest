import { useState, useContext } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";
import {
  Stack,
  Button,
  SvgIcon,
  Theme,
  useMediaQuery,
  Box,
  Skeleton,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Header } from "@/components";
import {
  ModalAdministrar,
  CardCategory,
} from "@/features/administrar/components";

const Administrar = () => {
  const [open, setOpen] = useState(false);
  const { categories, getCategories, loading } = useContext(CategoryContext);

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  const handleOpenModalAdministrar = () => {
    setOpen(true);
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Stack spacing={1}>
            <Header title="Administrar" subtitle="Administrar categorias." />
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
              onClick={handleOpenModalAdministrar}
            >
              Agregar
            </Button>
          </div>
        </Stack>
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
            categories.map((category) => {
              return (
                <CardCategory
                  key={category._id}
                  id={category._id}
                  nombre={category.nombre}
                  imagen={category.imagenUrl}
                  getCategories={getCategories}
                  handleOpenModalAdministrar={handleOpenModalAdministrar}
                />
              );
            })
          )}
        </Box>
      </Stack>
      <ModalAdministrar open={open} setOpen={setOpen} />
    </>
  );
};

export default Administrar;
