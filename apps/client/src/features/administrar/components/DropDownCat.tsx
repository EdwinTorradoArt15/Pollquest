import { useState, useContext } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";
import { FiMoreHorizontal, FiTrash2, FiEdit } from "react-icons/fi";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import * as categoriesServices from "@/features/administrar/services/categoriesServices";
import Swal from "sweetalert2";

interface DropDownCatProps {
  id: string;
  getCategories: () => void;
  handleOpenModalAdministrar: () => void;
}

const DropDownCat = ({
  id,
  getCategories,
  handleOpenModalAdministrar,
}: DropDownCatProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { getCategory } = useContext(CategoryContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCategoryAndOpenModal = (id: string) => {
    getCategory(id);
    handleOpenModalAdministrar();
  };

  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `No podrás revertir esto!`,
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#D00000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "La categoría ha sido eliminada.", "success");
        categoriesServices
          .deleteCategory(id)
          .then(() => {
            toast.success("Mesa eliminada correctamente");
            getCategories();
          })
          .catch((error) => {
            toast.error("Error al eliminar la mesa");
            console.error(error);
          });
      }
    });
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
