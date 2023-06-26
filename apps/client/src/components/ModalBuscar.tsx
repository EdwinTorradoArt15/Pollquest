import { useState } from "react";
import {
  Modal,
  Fade,
  Box,
  Backdrop,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FiSearch } from "react-icons/fi";
import { CuerpoModal } from "@/components";

interface ModalUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useStyles = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isCustom = useMediaQuery(theme.breakpoints.down(800));

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmall ? "90vw" : isMedium ? "35vw" : isCustom ? "50vw" : "35vw",
    height: isSmall ? "50vh" : isMedium ? "45vh" : isCustom ? "80vh" : "45vh",
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };
};

const usuarios = [
  {
    id: 1,
    imagen: "https://picsum.photos/200/300",
    nombre: "Juan",
  },
  {
    id: 2,
    imagen: "https://picsum.photos/200/300",
    nombre: "Pedro",
  },
  {
    id: 3,
    imagen: "https://picsum.photos/200/300",
    nombre: "Maria",
  },
  {
    id: 4,
    imagen: "https://picsum.photos/200/300",
    nombre: "Jose",
  },
  {
    id: 5,
    imagen: "https://picsum.photos/200/300",
    nombre: "Luis",
  },
];

const ModalBuscar = ({ open, setOpen }: ModalUserProps) => {
  const [search, setSearch] = useState("");
  const styles = useStyles();

  const handleClose = () => {
    setSearch("");
    setOpen(false);
  };

  const filteredUsers = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={styles}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 0 1rem 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <FiSearch size={20} color="#919eab" />
              <input
                type="text"
                placeholder="Buscar..."
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  width: "100%",
                }}
                className="input-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: "#919eab29",
                height: "24px",
                minWidth: "24px",
                borderRadius: "6px",
                cursor: "default",
                padding: "0 6px",
              }}
            >
              <span
                style={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                }}
              >
                Esc
              </span>
            </Box>
          </Box>
          <Divider />
          <CuerpoModal filteredUsers={filteredUsers} search={search} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalBuscar;
