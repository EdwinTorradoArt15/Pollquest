import { useState, useContext } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";

const useDropDownCat = (handleOpenModalAdministrar: () => void) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { getCategory, handleDeleteCategory } = useContext(CategoryContext);

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

  return {
    anchorEl,
    handleClick,
    handleClose,
    getCategoryAndOpenModal,
    handleDeleteCategory,
  };
};

export default useDropDownCat;
