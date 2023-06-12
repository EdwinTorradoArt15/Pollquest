import axios from "axios";

export const getCategories = async () => {
  return await axios.get("/api/categorias");
};

export const getCategory = async (id: string) => {
  return await axios.get(`/api/categorias/${id}`);
}

export const createCategory = async <T>(category: T) => {
  return await axios.post("/api/categorias", category);
};

export const deleteCategory = async (id: string) => {
  return await axios.delete(`/api/categorias/${id}`);
};

export const updateCategory = async <T>(id: string, category: T) => {
  return await axios.patch(`/api/categorias/${id}`, category);
};
