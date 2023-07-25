import { Modal, Fade, Box, Backdrop, Divider } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { CuerpoModal } from "@/components";
import { useModalBuscar } from "@/components/search/hooks";
import { useStyles } from "@/utils/modal/useStyles";

interface ModalUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  avatarBackgroundColor: string;
  getInitials: (name: string, apellido: string) => string;
}

const ModalBuscar = ({
  open,
  setOpen,
  avatarBackgroundColor,
  getInitials,
}: ModalUserProps) => {
  const { handleClose, user, filteredUsers, search, setSearch } =
    useModalBuscar(setOpen);
  const styles = useStyles();

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
          <CuerpoModal
            filteredUsers={filteredUsers}
            search={search}
            avatarBackgroundColor={avatarBackgroundColor}
            getInitials={getInitials}
            user={user}
            handleClose={handleClose}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalBuscar;
