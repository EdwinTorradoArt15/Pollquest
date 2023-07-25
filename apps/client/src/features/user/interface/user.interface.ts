export interface User {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  descripcion?: string;
  imagenPerfilUrl?: string;
  imagenPortadaUrl?: string;
  siguiendo?: string[];
  seguidores?: string[];
}

export interface UserImageData {
  preview: string;
  data: File;
}

export interface UserFormData {
  nombre?: string;
  apellido?: string;
  celular?: string;
  email?: string;
  descripcion?: string;
  clave?: string;
}
