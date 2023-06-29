import { Alert } from "@mui/material";

type Severity = "success" | "info" | "warning" | "error" | undefined;

interface AlertaProps {
  titulo: string;
  type: Severity;
}

const Alerta = ({ titulo, type }: AlertaProps) => {
  return (
    <Alert severity={type}>
      <strong>{titulo}</strong>
    </Alert>
  );
};

export default Alerta;
