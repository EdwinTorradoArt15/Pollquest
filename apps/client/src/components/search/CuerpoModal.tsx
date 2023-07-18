import { Fragment } from "react";
import { Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  descripcion?: string;
  imagenPerfilUrl?: string;
  imagenPortadaUrl?: string;
}

interface CuerpoModalProps {
  filteredUsers: any;
  search: string;
  avatarBackgroundColor: string;
  getInitials: (name: string, apellido: string) => string;
  user: User;
  handleClose: () => void;
}

const CuerpoModal = ({
  filteredUsers,
  search,
  avatarBackgroundColor,
  getInitials,
  user,
  handleClose,
}: CuerpoModalProps) => {
  const showResults = search !== "" && filteredUsers.length > 0;

  return (
    <Box
      sx={{
        height: "98%",
        display: "flex",
        justifyContent: "center",
        mt: 1,
      }}
    >
      {search === "" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          <h6
            style={{
              fontSize: "18px",
              marginBottom: "0.5rem",
            }}
          >
            Busca personas
          </h6>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            Encuentra a tus amigos en Pollquest :).
          </p>
        </Box>
      )}
      {showResults ? (
        <Box sx={{ width: "100%" }}>
          {filteredUsers.map((usuario: any) => (
            <Link
              key={usuario._id}
              to={
                usuario._id === user._id
                  ? "/dashboard/perfil"
                  : `/dashboard/perfil/${usuario._id}`
              }
              onClick={handleClose}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  border: "dashed 1px transparent",
                  borderBottom: "dashed 1px rgba(0, 0, 0,0.2)",
                  padding: "0.6rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  borderRadius: "6px",
                  "&:hover": {
                    borderBottom: "dashed 1px transparent",
                    borderTop: "none",
                    border: "dashed 1px #3A53EE",
                    backgroundColor: "rgba(58, 83, 238, 0.1)",
                  },
                }}
              >
                {usuario.imagenPerfilUrl ? (
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      height: 40,
                      width: 40,
                      ml: 1,
                      backgroundColor: avatarBackgroundColor,
                    }}
                    src={usuario.imagenPerfilUrl}
                  />
                ) : (
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      height: 40,
                      width: 40,
                      ml: 1,
                      backgroundColor: avatarBackgroundColor,
                    }}
                  >
                    {usuario.nombre && usuario.apellido && (
                      <>{getInitials(usuario.nombre, usuario.apellido)}</>
                    )}
                  </Avatar>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {usuario.nombre}
                  </span>
                  {usuario._id === user._id ? (
                    <span
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Tú
                    </span>
                  ) : null}
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          {search !== "" && (
            <Fragment>
              <h6
                style={{
                  fontSize: "18px",
                  marginBottom: "0.5rem",
                }}
              >
                No se encontró
              </h6>
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                Ningún resultado encontrado para <strong>"{search}"</strong>.
              </p>
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                Verifica el nombre que escribiste.
              </p>
            </Fragment>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CuerpoModal;
