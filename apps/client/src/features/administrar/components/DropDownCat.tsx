import { FiMoreHorizontal, FiTrash2, FiEdit } from "react-icons/fi";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDropDownCat } from "@/features/administrar/hook";

interface DropDownCatProps {
  id: string;
  handleOpenModalAdministrar: () => void;
}

const DropDownCat = ({ id, handleOpenModalAdministrar }: DropDownCatProps) => {
  const {
    handleClick,
    anchorEl,
    getCategoryAndOpenModal,
    handleClose,
    handleDeleteCategory,
  } = useDropDownCat(handleOpenModalAdministrar);
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
            getCategoryAndOpenModal(id);
            handleClose();
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
            handleDeleteCategory(id);
            handleClose();
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
