import { Navigate } from "react-router-dom";
import { LOG_PUBLIC, LOG_PRIVATE } from "./paths";

interface RoutesProps {
  children: React.ReactNode;
}

export const Privates = ({ children }: RoutesProps) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={LOG_PRIVATE} />;
  }
  return <>{children}</>;
};

export const Publics = ({ children }: RoutesProps) => {
  if (localStorage.getItem("token")) {
    return <Navigate to={LOG_PUBLIC} />;
  }
  return <>{children}</>;
};
