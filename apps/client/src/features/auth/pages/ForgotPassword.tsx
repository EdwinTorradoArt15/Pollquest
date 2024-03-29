import { Box, useMediaQuery, useTheme } from "@mui/material";
import { StepsForgotPassword } from "@/features/auth/components";
import banner from "../assets/banner.png";

const ForgotPassword = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: !mdUp ? "100%" : "50%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid #e0e0e0",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              width: 550,
              px: 3,
            }}
          >
            <StepsForgotPassword />
          </Box>
        </Box>
        <Box
          sx={{
            display: !mdUp ? "none" : "block",
            width: !mdUp ? "0%" : "50%",
          }}
        >
          <img
            src={banner}
            alt="slider"
            style={{ height: "97vh", width: "100%" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
