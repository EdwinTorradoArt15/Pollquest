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
  createCategory: (data: FormCreateCategoryProps) => void;
}

export const CategoryContext = createContext<CategoryContextValues>({
  loading: false,
  categories: [],
  createCategory: () => {},
});

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const createCategory = async (data: FormCreateCategoryProps) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion);
      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]);
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

  const getCategories = async () => {
    try {
      const response = await categoriesServices.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ loading, createCategory, categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
