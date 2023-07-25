import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as categoriesServices from "@/features/administrar/services/categoriesServices";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  Category,
  FormCreateCategoryProps,
} from "@/features/administrar/interfaces/category.interfaces";

interface CategoryProviderProps {
  children: React.ReactNode;
}

interface CategoryContextValues {
  methodsCategory: any;
  openModal: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  loading: boolean;
  categories: any[];
  image: any;
  category: any;
  setCategory: (category: any) => void;
  setImg: (image: any) => void;
  getCategory: (id: string) => void;
  createCategory: (data: FormCreateCategoryProps) => void;
  updateCategory: (id: string, data: FormCreateCategoryProps) => void;
  handleDeleteCategory: (id: string) => void;
}

export const CategoryContext = createContext<CategoryContextValues>({
  methodsCategory: {},
  openModal: false,
  handleOpen: () => {},
  handleClose: () => {},
  loading: false,
  categories: [],
  category: {},
  setCategory: () => {},
  image: { preview: "", data: "" },
  setImg: () => {},
  getCategory: () => {},
  createCategory: () => {},
  updateCategory: () => {},
  handleDeleteCategory: () => {},
});

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const methodsCategory = useForm();
  const [openModal, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState({} as Category);
  const [image, setImg] = useState({ preview: "", data: "" });

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setImg({ preview: "", data: "" });
    setCategory({} as Category);
    setModalOpen(false);
    methodsCategory.reset();
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoriesServices.getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async (id: string) => {
    try {
      const { data } = await categoriesServices.getCategory(id);
      return setCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCategory = async (data: FormCreateCategoryProps) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion);
      if (data.file && data.file.length > 0) {
        formData.append("file", image.data);
      }
      const requestData: FormCreateCategoryProps = {
        nombre: formData.get("nombre") as string,
        descripcion: formData.get("descripcion") as string,
      };
      await categoriesServices.createCategory(requestData);
      setLoading(false);
      getCategories();
      toast.success("Categoria creada correctamente");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Error al crear la categoria");
      handleClose();
      console.error(error);
    }
  };

  const updateCategory = async (id: string, data: FormCreateCategoryProps) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion);
      if (data.file && data.file.length > 0) {
        formData.append("file", image.data);
      }
      const requestData: FormCreateCategoryProps = {
        nombre: formData.get("nombre") as string,
        descripcion: formData.get("descripcion") as string,
      };
      await categoriesServices.updateCategory(id, requestData);
      setLoading(false);
      getCategories();
      toast.success("Categoria actualizada correctamente");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Error al actualizar la categoria");
      handleClose();
      console.error(error);
    }
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
        categoriesServices
          .deleteCategory(id)
          .then(() => {
            Swal.fire(
              "Eliminado!",
              "La categoría ha sido eliminada.",
              "success"
            );
            getCategories();
          })
          .catch((error) => {
            Swal.fire("Error!", "La categoría no ha sido eliminada.", "error");
            console.error(error);
          });
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        methodsCategory,
        openModal,
        handleOpen,
        handleClose,
        loading,
        categories,
        category,
        setCategory,
        image,
        setImg,
        getCategory,
        createCategory,
        updateCategory,
        handleDeleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
