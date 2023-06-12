import axios from "axios";

export const createCategory = async <T>(category: T) => {
  return await axios.post("/api/categorias", category);
};

export const getCategories = async () => {
  return await axios.get("/api/categorias");
};

export const deleteCategory = async (id: string) => {
  return await axios.delete(`/api/categorias/${id}`);
}
