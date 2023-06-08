import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AccountPopoverProps {
  userName: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const AccountPopover = ({
  userName,
  anchorEl,
  open,
  onClose,
}: AccountPopoverProps) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "200px" },
      }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="body2">{userName}</Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
