import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as categoriesServices from "@/features/administrar/services/categoriesServices";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

interface CategoryProviderProps {
  children: React.ReactNode;
}

interface FormCreateCategoryProps {
  nombre: string;
  descripcion: string;
  file?: FileList;
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
  getCategories: () => void;
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
  getCategories: () => {},
  getCategory: () => {},
  createCategory: () => {},
  updateCategory: () => {},
  handleDeleteCategory: () => {},
});

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const methodsCategory = useForm<FormCreateCategoryProps>();
  const [openModal, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>({});
  const [image, setImg] = useState({ preview: "", data: "" });

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setImg({ preview: "", data: "" });
    setCategory({});
    setModalOpen(false);
    methodsCategory.reset();
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesServices.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async (id: string) => {
    try {
      const response = await categoriesServices.getCategory(id);
      return setCategory(response.data);
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
      await categoriesServices.createCategory(formData);
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
      await categoriesServices.updateCategory(id, formData);
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
        getCategories,
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
