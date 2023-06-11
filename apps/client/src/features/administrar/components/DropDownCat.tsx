import { useState } from "react";
import { FiMoreHorizontal, FiTrash2, FiEdit } from "react-icons/fi";
import { IconButton, Menu, MenuItem } from "@mui/material";

interface DropDownCatProps {
  id: string;
}

const DropDownCat = ({ id }: DropDownCatProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <FiMoreHorizontal />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            console.log("editar categoria", id);
            handleClose;
          }}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Editar
          <FiEdit style={{ color: "#3A53EE" }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("eliminar categoria", id);
            handleClose;
          }}
          sx={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          Eliminar
          <FiTrash2 style={{ color: "#D14343" }} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropDownCat;
