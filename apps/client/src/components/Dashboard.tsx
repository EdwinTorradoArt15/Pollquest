import { DashboardLayout } from "@/components";
import { Box, Container } from "@mui/material";
import { Administrar } from "@/features/administrar/pages";
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
              <Route path="/administrar" element={<Administrar />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
