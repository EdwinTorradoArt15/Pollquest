import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as categoriesServices from "@/features/administrar/services/categoriesServices";

interface CategoryProviderProps {
  children: React.ReactNode;
}

interface FormCreateCategoryProps {
  nombre: string;
  descripcion: string;
  file?: FileList;
}

interface CategoryContextValues {
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
}

export const CategoryContext = createContext<CategoryContextValues>({
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
});

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>({});
  const [image, setImg] = useState({ preview: "", data: "" });

  const getCategories = async () => {
    try {
      const response = await categoriesServices.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      setLoading(false);
      toast.error("Error al crear la categoria");
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
    } catch (error) {
      setLoading(false);
      toast.error("Error al actualizar la categoria");
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
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
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
