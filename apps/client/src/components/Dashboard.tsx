import { DashboardLayout } from "@/components";
import { Box, Container } from "@mui/material";

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
        <Container maxWidth="xl"></Container>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;