import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Navbar, Sidebar } from "@/components";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

interface DashboardLayourProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayourProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};

export default DashboardLayout;