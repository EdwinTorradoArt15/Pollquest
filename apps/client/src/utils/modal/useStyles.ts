import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const useStyles = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isCustom = useMediaQuery(theme.breakpoints.down(800));

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmall ? "90vw" : isMedium ? "35vw" : isCustom ? "50vw" : "35vw",
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };
};
