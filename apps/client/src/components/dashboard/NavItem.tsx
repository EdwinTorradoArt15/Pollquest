import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, ListItem, Typography } from "@mui/material";

interface NavItemProps {
  href: string;
  icon: JSX.Element;
  title: string;
}

interface SxProps {
  backgroundColor?: string;
  "&:hover"?: {
    backgroundColor?: string;
    color?: string;
    "& .MuiButton-startIcon, & .MuiTypography-root"?: {
      color?: string;
    };
  };
  display?: string;
  mb?: number;
  py?: number;
  px?: number;
}

const NavItem = ({ href, icon, title }: NavItemProps) => {
  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(location.pathname === href);
  }, [location, href]);

  return (
    <Link to={href} style={{textDecoration: "none"}}>
      <ListItem
        disableGutters
        sx={{
          backgroundColor: active && "rgb(255, 255, 255)",
          "&:hover": {
            backgroundColor: "rgb(255, 255, 255)",
            color: "neutral.900",
            "& .MuiButton-startIcon, & .MuiTypography-root": {
              color: "primary.main",
            },
          },
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        } as SxProps}
      >
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            borderRadius: 1,
            color: active ? "primary.main" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "primary.main" : "neutral.300",
            },
            "&:hover": {
              backgroundColor: "transparent",
              "& .MuiButton-startIcon": {
                color: "primary.main",
              },
            },
          } as SxProps}
        >
          <Typography sx={{ flexGrow: 1 }} fontWeight="600">{title}</Typography>
        </Button>
      </ListItem>
    </Link>
  );
};

export default NavItem;