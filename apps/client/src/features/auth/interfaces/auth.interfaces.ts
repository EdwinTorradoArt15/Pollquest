export interface LoginFormValues {
  email: string;
  clave: string;
}

export interface RegisterFormValues {
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  clave: string;
  confirmarClave: string;
}

export interface RegisterUser {
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  clave: string;
}
