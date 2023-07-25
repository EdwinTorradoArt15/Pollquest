export interface Category {
  _id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
}

export interface FormCreateCategoryProps {
  nombre: string;
  descripcion: string;
  file?: FileList;
}
