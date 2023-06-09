import { DashboardLayout } from "@/components";
import { Box, Container } from "@mui/material";
import { Administrar } from "@/features/administrar/pages";
import { Perfil } from "@/features/user/pages";
import { Completados } from "@/features/completados/pages";
import { Cuestionarios } from "@/features/cuestionarios/pages";
import { Inicio } from "@/features/inicio/pages";
import { Routes, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mt: 3, mx: 3 }}>
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/cuestionarios" element={<Cuestionarios />} />
              <Route path="/completados" element={<Completados />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/administrar" element={<Administrar />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
