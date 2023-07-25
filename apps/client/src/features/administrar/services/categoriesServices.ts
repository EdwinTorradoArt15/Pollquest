import axios from "axios";
import { FormCreateCategoryProps } from "@/features/administrar/interfaces/category.interfaces";

export const getCategories = async () => {
  return await axios.get("/api/categorias");
};

export const getCategory = async (id: string) => {
  return await axios.get(`/api/categorias/${id}`);
};

export const createCategory = async (category: FormCreateCategoryProps) => {
  return await axios.post("/api/categorias", category);
};

export const deleteCategory = async (id: string) => {
  return await axios.delete(`/api/categorias/${id}`);
};

export const updateCategory = async (
  id: string,
  category: FormCreateCategoryProps
) => {
  return await axios.patch(`/api/categorias/${id}`, category);
};
