import { useContext, useEffect } from "react";
import { CategoryContext } from "@/features/administrar/context/CategoryContext";
import { FormCreateCategoryProps } from "@/features/administrar/interfaces/category.interfaces";

const useModal = () => {
  const {
    createCategory,
    updateCategory,
    category,
    loading,
    image,
    setImg,
    handleClose,
    methodsCategory,
    openModal
  } = useContext(CategoryContext);

  const handleChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg(img);
  };

  const onsubmit = (formData: FormCreateCategoryProps) => {
    if (category?._id) {
      updateCategory(category._id, formData);
    } else {
      createCategory(formData);
    }
  };

  useEffect(() => {
    if (category?._id) {
      methodsCategory.setValue("nombre", category.nombre);
      methodsCategory.setValue("descripcion", category.descripcion);
      setImg({ preview: category.imagenUrl, data: "" });
    }
  }, [category]);

  return {
    openModal,
    handleClose,
    category,
    methodsCategory,
    onsubmit,
    image,
    handleChange,
    loading,
  };
};

export default useModal;
